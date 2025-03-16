const db = require('../../../config/SQL/sqlconfig');

const getallseries = async (req, res) => {
    try {
        const sql = `select book_series.*,count(books.id) as totalbooks from book_series left join books on book_series.id = books.series_id group by book_series.id;`;

        const [series] = await db.promise().query(sql);

        if (series.length === 0) {
            return res.status(404).json({ message: 'No series found' });
        }

        return res.status(200).json(series);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = getallseries;

