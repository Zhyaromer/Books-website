const db = require('../../../config/SQL/sqlconfig');

const getallbooks = async (req, res) => {

    try {
        const sql = `select books.*, authors.name,book_series.series_title from books inner join authors on books.author_id = authors.id 
        left join book_series on books.series_id = book_series.id`;
        const [result] = await db.promise().query(sql);

        if (result.length === 0) {
            return res.status(404).json({ message: 'No books found' });
        }

        return res.status(200).json(result);
    } catch {
        return res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = getallbooks