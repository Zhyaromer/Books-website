const db = require('../../../config/SQL/sqlconfig');

const getAllAuthors = async (req, res) => {
    try {
        const sql = `select authors.*,count(books.id) as totalbooks from authors inner join books on authors.id = books.author_id group by authors.id`;

        const [authors] = await db.promise().query(sql);

        if (authors.length === 0) {
            return res.status(404).json({ message: 'No authors found' });
        }

        return res.status(200).json(authors);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = getAllAuthors