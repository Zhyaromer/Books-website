const db = require('../../config/SQL/sqlconfig');

const addSaveBook = async (req, res) => {
    const { book_id } = req.params;
    const user_id = req?.user?.id;

    if (!user_id || !book_id) {
        return res.status(400).json({ message: "user_id and book_id are required" });
    }

    try {
        const [[existing]] = await db.promise().query(
            "SELECT * FROM user_saves WHERE user_id = ? AND book_id = ?",
            [user_id, book_id]
        );

        if (existing) {
            await db.promise().query(
                "DELETE FROM user_saves WHERE user_id = ? AND book_id = ?",
                [user_id, book_id]
            );
            return res.status(200).json({ message: "Book removed from Save list" });
        } else {
            const [result] = await db.promise().query(
                "INSERT INTO user_saves (user_id, book_id) VALUES (?, ?)",
                [user_id, book_id]
            );

            if (result.affectedRows > 0) {
                return res.status(201).json({ message: "Book added to Save list" });
            }
            return res.status(500).json({ message: "Error saving book" });
        }
    } catch {
        return res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = addSaveBook 
