const db = require('../../config/SQL/sqlconfig');
const xss = require('xss');

// Get all books
const getRandomBooks = (req, res) => {
    const { genre, language } = req.query;

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

        sql += `ORDER BY RAND() LIMIT 10`;

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

module.exports = getRandomBooks;
