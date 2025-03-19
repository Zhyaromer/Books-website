const db = require('../../../config/SQL/sqlconfig');


const updateQuotes = async (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ message: 'Quote ID is required' });
    }

    const { quote, author_id, book_id } = req.body;

    if (!quote || !author_id || !book_id) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    try {
        const sql = `UPDATE quotes SET quote = ?, author_id = ?, book_id = ? WHERE id = ?`;
        const values = [quote, author_id, book_id, id];

        const [result] = await db.promise().query(sql, values);

        if (result.affectedRows > 0) {
            return res.status(200).json({ message: 'Quote updated successfully' });
        } else {
            return res.status(500).json({ message: 'Error updating quote' });
        }
    } catch {
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}

module.exports = updateQuotes;