const db = require('../../config/SQL/sqlconfig');

const getUserComments = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 6;
    const offset = (page - 1) * limit;
    const user_id = req?.user?.id;

    if (!user_id) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    try {
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

        console.log(comments);

        return res.status(200).json({
            comments,
            total: total,
            currentPage: parseInt(page),
            totalPages: Math.ceil(total / limit)
        });
    } catch {
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

module.exports = getUserComments;