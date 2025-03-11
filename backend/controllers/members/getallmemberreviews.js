const db = require('../../config/SQL/sqlconfig');
const xss = require('xss');

const getallmemberreviews = async (req, res) => {
    const { page = 1, limit = 6 } = req.query;
    const offset = (page - 1) * parseInt(limit);
    const username = xss(req?.query?.username);

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
            "SELECT COUNT(*) as total FROM reviews WHERE user_id = ?",
            [user_id]
        );
        const total = countResult[0].total;

        if (total === 0) {
            return res.status(200).json({
                comments: [],
                total: 0,
                currentPage: parseInt(page),
                totalPages: 0
            });
        }

        const [comments] = await db.promise().query(`
            SELECT reviews.*, books.title,books.cover_image, users.username,users.coverImgURL 
            FROM reviews 
            INNER JOIN books ON books.id = reviews.book_id 
            INNER JOIN users ON users.id = reviews.user_id 
            WHERE reviews.user_id = ? LIMIT ? OFFSET ?;
            `, [user_id, parseInt(limit), parseInt(offset)]);

        if (comments.length === 0) {
            return res.status(200).json({ message: "No comments found" });
        }

        return res.status(200).json({
            comments,
            total: total,
            currentPage: parseInt(page),
            totalPages: Math.ceil(total / limit)
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}

module.exports = getallmemberreviews;