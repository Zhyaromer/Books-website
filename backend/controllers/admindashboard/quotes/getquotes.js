const db = require('../../../config/SQL/sqlconfig');

const getquotes = async (req, res) => {
    try {
        const [quotes] = await db.promise().query(`select quotes.*,authors.name,books.title from quotes inner join books on quotes.book_id = books.id
        inner join authors on quotes.author_id = authors.id`);

        if (quotes.length === 0) {
            return res.status(404).json({ message: 'No quotes found' });
        }

        return res.status(200).json(quotes);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = getquotes;