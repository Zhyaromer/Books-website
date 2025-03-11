const db = require('../../config/SQL/sqlconfig');

const getusernameandpic = async (req, res) => {
    const user_id = req?.user?.id;

    if (!user_id) {
        return res.status(400).json({ error: "user_id and book_id are required" });
    }

    try {
        const sql = `SELECT username, coverImgURL FROM users WHERE id = ?`

        const [results] = await db.promise().query(sql, [user_id]);

        if (results.length === 0) {
            return res.status(404).json({ error: "User not found" });
        }

        return res.status(200).json(results[0]);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error" });
    }
}

module.exports = getusernameandpic;