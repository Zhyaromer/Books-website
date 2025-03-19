const db = require('../../config/SQL/sqlconfig');

const getallbookseries = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 6;
  const offset = (page - 1) * limit;

  try {
    const [countRows] = await db.promise().query(`
      SELECT COUNT(*) AS series_count 
      FROM (
          SELECT COUNT(books.id) AS book_num 
          FROM books 
          INNER JOIN book_series ON books.series_id = book_series.id 
          GROUP BY book_series.id
      ) AS subquery;`);
    const total = countRows[0].series_count;

    if (total === 0) {
      return res.status(404).json({ message: 'No book series found' });
    }

    const sql = `select count(books.id) as book_num,book_series.* from books inner join book_series on books.series_id = book_series.id group by book_series.id LIMIT ? OFFSET ?`;
    const [result] = await db.promise().query(sql, [limit, offset]);

    if (result.length === 0) {
      return res.status(404).json({ message: 'No book series found' });
    }

    return res.status(200).json({
      bookseries: result,
      total: total,
      currentPage: parseInt(page),
      totalPages: Math.ceil(total / limit)
    });
  } catch {
    return res.status(500).json({ message: 'Internal server error' });
  }
}

module.exports = getallbookseries;
