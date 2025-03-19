const db = require('../../config/SQL/sqlconfig');

const bookreadsCheck = async (req, res) => {
    const { book_id } = req?.query;
    const user_id = req?.user?.id;

    if (!user_id || !book_id) {
        return res.status(400).json({ message: "user_id and book_id are required" });
    }

    try {
        const sql = `SELECT book_id FROM user_reads WHERE user_id = ? AND book_id = ?`
        
        const [result] = await db.promise().query(sql, [user_id, book_id]);

        if (result.length > 0) {
            return res.status(200).json({ success: true, message: "Book already in read list" });
        } else {
            return res.status(200).json({ success: false, message: "Book not in read list" });
        }
    } catch  {
        return res.status(500).json({ message: "Internal server error" });
    }

}

module.exports = bookreadsCheck;