const db = require('../../config/SQL/sqlconfig');

const bookreadsCheck = async (req, res) => {
    console.log(`req.query`);
    const { book_id } = req?.query;
    console.log(`book_id : ${book_id}`);
    const user_id = req?.user?.id;
    console.log(`user_id : ${user_id}`);

    if (!user_id || !book_id) {
        return res.status(400).json({ error: "user_id and book_id are required" });
    }

    try {
        const sql = `SELECT book_id FROM user_reads WHERE user_id = ? AND book_id = ?`
        
        const [result] = await db.promise().query(sql, [user_id, book_id]);

        if (result.length > 0) {
            return res.status(200).json({ success: true, message: "Book already in read list" });
        } else {
            return res.status(200).json({ success: false, message: "Book not in read list" });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error" });
    }

}

module.exports = bookreadsCheck;