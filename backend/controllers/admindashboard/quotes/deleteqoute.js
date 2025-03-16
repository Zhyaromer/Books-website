const db = require('../../../config/SQL/sqlconfig');

const deleteqoute = async (req, res) => {
    const { id } = req.params;
    try {
       const [result] = await db.promise().query('DELETE FROM quotes WHERE id = ?', [id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Quote not found' });
        }
        return res.status(200).json({ message: 'Quote deleted successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error deleting quote' });
    }
};

module.exports = deleteqoute;