const db = require('../../config/SQL/sqlconfig');

const userID = async (req, res) => {
    const user_id = req?.user?.id;
    const review_id = req.params.id;

    if (!user_id || !review_id) {
        return res.status(400).json({ message: "user_id and review_id are required" });
    }

    try {
        const sql = `SELECT user_id FROM reviews WHERE id = ?`
        const [result] = await db.promise().query(sql, [review_id]);

        if (result.length === 0) {
            return res.status(404).json({ message: "Review not found" });
        }

        const review_owner_id = result[0].user_id;
        
        const canModify = parseInt(user_id) === parseInt(review_owner_id);
        
        return res.status(200).json({ canModify });
    } catch {
        return res.status(500).json({ message: "Internal server error" });
    }
}

module.exports = userID;