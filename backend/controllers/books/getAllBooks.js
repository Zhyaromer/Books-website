const db = require('../../config/SQL/sqlconfig');
const xss = require('xss');

// Get all books
const getAllBooks = (req, res) => {
    const { genre, language } = req.query;
    let sql = `
        SELECT books.id, books.title, books.author_id, books.series_id, 
       books.genre, books.part_num, books.language, books.description, 
       books.published_date, books.rating, books.cover_image, 
       books.page_count, books.views, 
       authors.name,authors.bio,authors.imgURL
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

        db.query(sql, values, (err, result) => {
            if (err) {
                console.log(err);
                return res.status(500).json({ message: 'Internal Server Error' });
            }

            return res.status(200).json(result);
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};


module.exports = getAllBooks;