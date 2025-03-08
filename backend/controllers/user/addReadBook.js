const db = require('../../config/SQL/sqlconfig');

const addReadBook = async (req, res) => {
    const { book_id } = req.params;
    console.log(book_id);
    console.log(req?.user);
    const user_id = req?.user?.id;

    if (!user_id || !book_id) {
        return res.status(400).json({ error: "user_id and book_id are required" });
    }

    try {
        const [[existing]] = await db.promise().query(
            "SELECT * FROM user_reads WHERE user_id = ? AND book_id = ?",
            [user_id, book_id]
        );

        if (existing) {
            await db.promise().query(
                "DELETE FROM user_reads WHERE user_id = ? AND book_id = ?",
                [user_id, book_id]
            );
            return res.status(200).json({ message: "Book removed from read list" });
        } else {
            const [result] = await db.promise().query(
                "INSERT INTO user_reads (user_id, book_id) VALUES (?, ?)",
                [user_id, book_id]
            );

            if (result.affectedRows > 0) {
                return res.status(201).json({ message: "Book added to read list" });
            }
            return res.status(500).json({ error: "Error saving book" });
        }
    } catch (error) {
        console.error("Error toggling book read status:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
};

module.exports = addReadBook 
