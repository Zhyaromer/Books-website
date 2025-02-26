const db = require('../../config/SQL/sqlconfig');
const xss = require('xss');

const getAuthorById = async (req, res) => {
    const { id } = req.params;
    if (!id) {
        return res.status(400).json({ message: 'Author ID is missing' });
    }

    const sanitizedId = id ? xss(id) : null;

    try {
        const sql1 = `
        select * from authors where id = ?
        `

        const sql2 = `
        select id, title,author_id,genre,language,page_count,cover_image from books where author_id = ?
        `

        db.query(sql1, [sanitizedId], (err, author) => {
            if (err) {
                return res.status(500).json({ message: 'Internal Server Error' });
            }

            if (author.length === 0) {
                return res.status(404).json({ message: 'No author found' });
            }

            db.query(sql2, [sanitizedId], (err, books) => {
                if (err) {
                    return res.status(500).json({ message: 'Internal Server Error' });
                }

                if (books.length === 0) {
                    return res.status(404).json({ message: 'No books found' });
                }

                return res.status(200).json({ author, books });
            });
        });

    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}

module.exports = getAuthorById;