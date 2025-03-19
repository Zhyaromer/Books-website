const db = require('../../config/SQL/sqlconfig');
const xss = require('xss');

const incrementnewsview = async (req, res) => {
    const id = xss(req.params.id);

    if (!id) {
        return res.status(400).json({ message: 'News ID is required' });
    }

    try {
        const sql = `UPDATE news SET views = views + 1 WHERE id = ?`;

        const [result] = await db.promise().query(sql, [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'News not found' });
        }

        return res.status(200);
    } catch {
        return res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = incrementnewsview ;