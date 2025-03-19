const db = require('../../config/SQL/sqlconfig');

const addsuggestion = async (req, res) => {
    const { book_id } = req.params;
    const user_id = req?.user?.id;

    if (!user_id || !book_id) {
        return res.status(400).json({ message: "user_id and book_id are required" });
    }

    try {
        const [[existing]] = await db.promise().query(
            "SELECT id FROM suggestions WHERE user_id = ? AND book_id = ?",
            [user_id, book_id]
        );

        if (existing) {
            await db.promise().query(
                "DELETE FROM suggestions WHERE user_id = ? AND book_id = ?",
                [user_id, book_id]
            );
            return res.status(200).json({ message: "Book removed from read list" });
        } else {
            const [result] = await db.promise().query(
                "INSERT INTO suggestions (user_id, book_id) VALUES (?, ?)",
                [user_id, book_id]
            );

            if (result.affectedRows > 0) {
                return res.status(201).json({ message: "suggestions added" });
            }
            return res.status(500).json({ message: "Error to read list book" });
        }
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = addsuggestion;
