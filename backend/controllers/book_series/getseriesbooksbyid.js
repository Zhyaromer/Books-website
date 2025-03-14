const db = require('../../config/SQL/sqlconfig');
const xss = require('xss');

const getseriesbooksbyid = async (req, res) => {
    const id = xss(req.params.id);
    if (!id) {
        return res.status(400).json({ error: 'Book Series ID is required' });
    }

    try {
        const sql = `SELECT id,title,page_count,description,published_date,genre,cover_image FROM books WHERE series_id = ?`;

        const [result] = await db.promise().query(sql, [id]);

        if (result.length === 0) {
            return res.status(404).json({ message: 'No books found' });
        }

        const sql2 = `select series_title,cover_img,description,state from book_series where id = ?`;
        const [result2] = await db.promise().query(sql2, [id]);

        if (result2.length === 0) {
            return res.status(404).json({ message: 'No book series found' });
        }

        return res.status(200).json({books : result, series : result2[0]});
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = getseriesbooksbyid