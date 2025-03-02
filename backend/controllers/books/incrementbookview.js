const db = require('../../config/SQL/sqlconfig');
const xss = require('xss');

const incrementBookView = async (req, res) => {
    const bookId = xss(req.params.id);

    if (!bookId) {
        return res.status(400).json({ error: 'Book ID is required' });
    }
    try {
        const [result] = await db.promise().query('UPDATE books SET views = views + 1 WHERE id = ?', [bookId]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Book not found' });
        }

        return res.status(200).json(result);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = incrementBookView;