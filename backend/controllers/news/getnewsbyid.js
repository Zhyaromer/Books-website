const db = require('../../config/SQL/sqlconfig');
const xss = require('xss');

const getNewsById = async (req, res) => {
    const id = xss(req.params.id);

    if (!id) {
        return res.status(400).json({ error: 'News ID is required' });
    }

    try {
        const sql = `SELECT * FROM news WHERE id = ?`;

        const [result] = await db.promise().query(sql, [id]);

        if (result.length === 0) {
            return res.status(404).json({ message: 'News not found' });
        }

        return res.status(200).json(result[0]);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = getNewsById