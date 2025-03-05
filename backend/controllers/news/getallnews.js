const db = require('../../config/SQL/sqlconfig');

const getAllNews = async (req, res) => {
    try {
        const sql = `SELECT * FROM news`

        const [news] = await db.promise().query(sql);

        if (news.length === 0) {
            res.status(404).json({ message: 'No news found' });
        }

        res.status(200).json(news);
    } catch (error) {
        
    }
}

module.exports = getAllNews