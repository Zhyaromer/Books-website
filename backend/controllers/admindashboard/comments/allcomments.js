const db = require('../../../config/SQL/sqlconfig');

const getAllComments = async (req, res) => {
    try {
        const sql = `select reviews.*,users.username ,users.coverImgURL ,books.title from reviews inner join users on users.id = reviews.user_id inner join books on reviews.book_id = books.id`
        const [results] = await db.promise().query(sql);

        if (results.length === 0) {
            return res.status(404).json({ message: 'No comments found' });
        }

        return res.status(200).json(results);
    } catch {
        return res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = getAllComments;

