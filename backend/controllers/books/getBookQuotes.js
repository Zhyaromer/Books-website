const db = require('../../config/SQL/sqlconfig');

const getBookQuotes = (req, res) => {

    let sql = `
      SELECT 
       books.title,books.author_id,books.id as books_id,
       authors.name, authors.imgURL,
       quotes.id as quotes_id ,quotes.quote
       FROM books
       INNER JOIN authors ON books.author_id = authors.id
       left join quotes on books.id = quotes.book_id
       where quotes.quote is not null
       ORDER BY RAND() LIMIT 1
    `;

    try {
        db.query(sql, (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ message: 'Internal Server Error' });
            }

            if (result.length === 0) {
                return res.status(404).json({ message: 'No books found' });
            }

            return res.status(200).json(result);
        });
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports = getBookQuotes;
