const db = require('../../config/SQL/sqlconfig');
const xss = require('xss');

// Get all books
const getAllBooks = (req, res) => {
    const { genre, language, sorting } = req.query;

    let sql = `
       SELECT books.id, books.title, books.author_id, books.genre, books.language, 
       books.page_count, books.cover_image, authors.name, authors.imgURL 
       FROM books 
       INNER JOIN authors ON books.author_id = authors.id	
    `;

    let conditions = [];
    let values = [];

    let sanitizedGenres = [];
    if (genre) {
        const genreArray = genre.split(',').map(g => g.trim());
        sanitizedGenres = genreArray.map(g => xss(g));

        if (sanitizedGenres.length > 0) {
            conditions.push(`books.genre IN (${sanitizedGenres.map(() => '?').join(', ')})`);
            values.push(...sanitizedGenres);
        }
    }

    if (language && language !== undefined && language !== 'all') {
        const sanitizedLanguage = xss(language);
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
        case 'most page_count':
            sql += ' ORDER BY books.page_count DESC';
            break;
        case 'lowest page_count':
            sql += ' ORDER BY books.page_count ASC';
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
};

module.exports = getAllBooks;
