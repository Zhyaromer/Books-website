const db = require('../../config/SQL/sqlconfig');

const getseriesmainpage = async (req, res) => {
  try {
    const sql = `select count(books.id) as book_num,book_series.* from books inner join book_series on books.series_id = book_series.id group by book_series.id limit 4`;
    const [result] = await db.promise().query(sql);
    
    console.log(result);

    if (result.length === 0) {
      return res.status(404).json({ message: 'No book series found' });
    }

    return res.status(200).json(result);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = getseriesmainpage ;
