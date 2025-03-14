const db = require('../../config/SQL/sqlconfig');

const suggestionscheck = async (req, res) => {
    const { book_id } = req?.query;
    const user_id = req?.user?.id;

    if (!user_id || !book_id) {
        return res.status(400).json({ error: "user_id and book_id are required" });
    }

    try {
        const sql = `SELECT book_id FROM suggestions WHERE user_id = ? AND book_id = ?`
        
        const [result] = await db.promise().query(sql, [user_id, book_id]);

        if (result.length > 0) {
            return res.status(200).json({ success: true, message: "suggestions are already added added" });
        } else {
            return res.status(200).json({ success: false, message: "suggestions not added" });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error" });
    }

}

module.exports = suggestionscheck;