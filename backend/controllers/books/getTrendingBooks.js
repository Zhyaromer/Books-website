const db = require('../../config/SQL/sqlconfig');

const getTrendingBooks = (req, res) => {
    try {
        const sql = `
        SELECT  books.id, books.title,books.author_id,books.genre,books.language,books.page_count,books.cover_image, 
        authors.name, authors.bio, authors.imgURL
        FROM books
        INNER JOIN authors ON books.author_id = authors.id
        ORDER BY COALESCE(books.views, 0) DESC
        LIMIT 6
        `
        // where books.created_at >= NOW() - INTERVAL 1 month

        db.query(sql, (err, result) => {
            if (err) {
                return res.status(500).json({ message: 'Internal Server Error' });
            }
            if (result.length === 0) {
                return res.status(404).json({ message: 'No books found' });
            }

            return res.status(200).json(result);
        });
    } catch {
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}

module.exports = getTrendingBooks;