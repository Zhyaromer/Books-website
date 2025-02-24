const db = require('../../config/SQL/sqlconfig');
const xss = require('xss');

// Get book by ID
const getBookById = (req, res) => {
    const { id } = req.params;
    if (!id) {
        return res.status(400).json({ message: 'Missing book ID' });
    }

    try {
        const sanitizedId = id ? xss(id) : null;

        const sql1 = `
        SELECT books.id, books.title, books.author_id, books.series_id, 
        books.genre, books.part_num, books.language, books.description, 
        books.published_date, books.rating, books.cover_image, 
        books.page_count, books.views, 
        authors.name, authors.bio, authors.imgURL, quotes.quote
        FROM books
        INNER JOIN authors ON books.author_id = authors.id
        LEFT JOIN quotes ON books.id = quotes.book_id
        WHERE books.id = ?
        `;

        const sql2 = `
        SELECT 
        books.id, books.title, books.author_id, 
        books.genre, books.part_num, books.description, 
        books.cover_image, 
        authors.name, authors.imgURL, 
        book_series.series_title, book_series.state
        FROM books
        INNER JOIN authors ON books.author_id = authors.id
        LEFT JOIN book_series ON books.series_id = book_series.id
        WHERE books.series_id = (SELECT series_id FROM books WHERE id = ?) 
        AND books.id != ?
        ORDER BY books.part_num
        `;

        const queryPromise = (sql, values) => {
            return new Promise((resolve, reject) => {
                db.query(sql, values, (err, result) => {
                    if (err) reject(err);
                    else resolve(result);
                });
            });
        };

        queryPromise(sql1, [sanitizedId])
            .then(bookDetails => {
                if (!bookDetails.length) {
                    return res.status(404).json({ message: 'Book not found' });
                }

                const book = bookDetails[0]; 
                const { genre, language } = book;

                return Promise.all([
                    queryPromise(sql2, [sanitizedId, sanitizedId]),
                    queryPromise(`
                    SELECT 
                    books.id, books.title, books.author_id, 
                    books.genre, books.part_num, books.description, 
                    books.cover_image, 
                    authors.name, authors.imgURL
                    FROM books
                    INNER JOIN authors ON books.author_id = authors.id
                    WHERE books.id != ? AND books.genre = ? AND books.language = ?
                    AND books.id >= (SELECT FLOOR(MAX(id) * RAND()) FROM books)
                    LIMIT 6
                    `, [sanitizedId, genre, language])
                ]).then(([seriesBooks, similarBooks]) => {
                    res.json({ book, seriesBooks, similarBooks });
                });
            })
            .catch(error => {
                console.log(error);
                res.status(500).json({ message: 'Internal Server Error' });
            });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports = getBookById;
