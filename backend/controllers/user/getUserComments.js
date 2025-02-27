const db = require('../../config/SQL/sqlconfig');

const getUserComments = async (req, res) => {
    const user_id = req?.user?.id;

    if (!user_id) {
        return res.status(401).json({ error: "Unauthorized" });
    }

    try {
        const [comments] = await db.promise().query(`
            SELECT reviews.*, books.title, users.username,users.coverImgURL 
            FROM reviews 
            INNER JOIN books ON books.id = reviews.book_id 
            INNER JOIN users ON users.id = reviews.user_id 
            WHERE reviews.user_id = ?;
            `, [user_id]);

        if (comments.length === 0) {
            return res.status(200).json({ message: "No comments found" });
        }

        return res.status(200).json(comments);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}

module.exports = getUserComments;