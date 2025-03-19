const db = require('../../config/SQL/sqlconfig');

// Get newest books
const getnwewestbooks = (req, res) => {
    let sql = `
       select books.id, books.title,books.description ,books.published_date, books.author_id,books.genre,books.language,books.page_count,books.cover_image,authors.name,authors.imgURL 
       FROM BOOKS inner join authors on books.author_id = authors.id 
       ORDER BY books.created_at DESC LIMIT 9	
    `;

    try {
        db.query(sql, (err, result) => {
            if (err) {
                return res.status(500).json({ message: 'Internal Server Error' });
            }

            if (result.length === 0) {
                return res.status(404).json({ message: 'No books found' });
            }

            return res.status(200).json(result);
        });
    } catch {
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports = getnwewestbooks;
