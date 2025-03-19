const db = require('../../../config/SQL/sqlconfig');

const getAllComments = async (req, res) => {
    const { id } = req.params;


    if (!id) {
        return res.status(400).json({ message: 'Comment ID is required' });
    }

    try {
        const sql = `delete from reviews where id = ?`;
        const [results] = await db.promise().query(sql, [id]);

        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'Comment not found' });
        }

        return res.status(200).json({ message: 'Comment deleted successfully' });
    } catch {
        return res.status(500).json({ message: 'Error deleting comment' });
    }
}

module.exports = getAllComments;