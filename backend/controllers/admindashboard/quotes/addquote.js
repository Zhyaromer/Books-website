const db = require('../../../config/SQL/sqlconfig');

const addquote = async (req, res) => {
    const { quote, author_id, book_id } = req.body;

    if (!quote || !author_id || !book_id) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    try {
        const sql = `INSERT INTO quotes (quote, author_id, book_id) VALUES (?, ?, ?)`;
        const values = [quote, author_id, book_id];

        const [result] = await db.promise().query(sql, values);

        if (result.affectedRows > 0) {
            return res.status(200).json({ message: 'Quote added successfully' });
        } else {
            return res.status(500).json({ message: 'Error adding quote' });
        }
    } catch {
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}

module.exports = addquote