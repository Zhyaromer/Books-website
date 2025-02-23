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

       const sql = `SELECT books.id, books.title, books.author_id, books.series_id, 
       books.genre, books.part_num, books.language, books.description, 
       books.published_date, books.rating, books.cover_image, 
       books.page_count, books.views, 
       authors.name,authors.bio,authors.imgURL,quotes.quote
       FROM books
       INNER JOIN authors ON books.author_id = authors.id
       left join quotes on books.id = quotes.book_id
       WHERE books.id = ?;`;

        db.query(sql, [sanitizedId], (err, result) => {
            if (err) {
                console.log(err);
                return res.status(500).json({ message: 'no book found' });
            }
            return res.status(200).json(result);
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }

}

module.exports = getBookById;