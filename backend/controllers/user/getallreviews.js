const db = require('../../config/SQL/sqlconfig');

const getallreviews = async (req, res) => {
    const {book_id} = req?.query;

    if (!book_id) {
        return res.status(401).json({ error: "book id is required" });
    }

    try {
        const [comments] = await db.promise().query(`
            SELECT reviews.*, books.title, users.username,users.coverImgURL 
            FROM reviews 
            INNER JOIN books ON books.id = reviews.book_id 
            INNER JOIN users ON users.id = reviews.user_id 
            WHERE reviews.book_id = ?;
            `, [book_id]);

        if (comments.length === 0) {
            return res.status(200);
        }

        return res.status(200).json(comments);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}

module.exports = getallreviews;