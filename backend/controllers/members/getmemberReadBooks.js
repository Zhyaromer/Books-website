const db = require('../../config/SQL/sqlconfig');
const xss = require('xss');

const getmemberReadBooks = async (req, res) => {
    const { page = 1, limit = 12 } = req.query;
    const offset = (page - 1) * parseInt(limit);
    const username  = xss(req?.query?.username);

    if (!username) {
        return res.status(404).json({ error: "not found" });
    }

    try {
        const sql = `select * from users where username = ?`;
        const [result] = await db.promise().query(sql, [username]);

        if (result.length === 0) {
            return res.status(404).json({ error: "User not found" });
        }

        const user_id = result[0].id;

        const [countResult] = await db.promise().query(
            "SELECT COUNT(*) as total FROM user_reads WHERE user_id = ?",
            [user_id]
        );
        const total = countResult[0].total;

        if (total === 0) {
            return res.status(200).json({
                foundBooks: [],
                total: 0,
                currentPage: parseInt(page),
                totalPages: 0
            });
        }

        const [readBooks] = await db.promise().query(
            "SELECT book_id FROM user_reads WHERE user_id = ? LIMIT ? OFFSET ?",
            [user_id, parseInt(limit), parseInt(offset)]
        );

        if (readBooks.length === 0) {
            return res.status(200).json({
                foundBooks: [],
                total: total,
                currentPage: parseInt(page),
                totalPages: Math.ceil(total / limit)
            });
        }

        const booksIds = readBooks.map(book => book.book_id);
        const placeholders = booksIds.map(() => '?').join(', ');

        const [foundBooks] = await db.promise().query(
            `SELECT books.id, books.title, books.author_id, books.genre, books.language, books.page_count, books.cover_image, 
             authors.name, authors.imgURL 
             FROM books 
             INNER JOIN authors ON books.author_id = authors.id 
             WHERE books.id IN (${placeholders})`,
            booksIds
        );

        return res.status(200).json({
            foundBooks: foundBooks,
            total: total,
            currentPage: parseInt(page),
            totalPages: Math.ceil(total / limit)
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}

module.exports = getmemberReadBooks;