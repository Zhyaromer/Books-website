const db = require('../../config/SQL/sqlconfig');
const xss = require('xss');

// Get all books
const getAllBooks = (req, res) => {
    const { genre, language, sorting } = req.query;
    
    let sql = `
       SELECT books.*, 
       authors.name, authors.bio, authors.imgURL
       FROM books
       INNER JOIN authors ON books.author_id = authors.id
    `;

    let conditions = [];
    let values = [];

    const sanitizedGenre = genre ? xss(genre) : null;
    const sanitizedLanguage = language ? xss(language) : null;

    try {
        if (sanitizedGenre) {
            conditions.push('books.genre = ?');
            values.push(sanitizedGenre);
        }

        if (sanitizedLanguage) {
            conditions.push('books.language = ?');
            values.push(sanitizedLanguage);
        }

        if (conditions.length > 0) {
            sql += ' WHERE ' + conditions.join(' AND ');
        }

        switch (sorting) {
            case 'views':
                sql += ' ORDER BY books.views DESC';
                break;
            case 'newest':
                sql += ' ORDER BY books.created_at DESC';
                break;
            case 'page_count':
                sql += ' ORDER BY books.page_count DESC';
                break;
            case 'year':
                sql += ' ORDER BY books.published_date DESC';
                break;
            default:
                sql += ' ORDER BY books.created_at DESC';
        }

        db.query(sql, values, (err, result) => {
            if (err) {
                return res.status(500).json({ message: 'Internal Server Error' });
            }

            if (result.length === 0) {
                return res.status(404).json({ message: 'No books found' });
            }

            return res.status(200).json(result);
        });
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports = getAllBooks;
