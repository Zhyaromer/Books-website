const db = require('../../config/SQL/sqlconfig');
const xss = require('xss');

const incrementauthorview = async (req, res) => {
    const authorId = xss(req.params.id);

    if (!authorId) {
        return res.status(400).json({ error: 'author ID is required' });
    }
    try {
        const [result] = await db.promise().query('UPDATE authors SET views = views + 1 WHERE id = ?', [authorId]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'author not found' });
        }

        console.log("here")

        return res.status(200).json(result);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = incrementauthorview;