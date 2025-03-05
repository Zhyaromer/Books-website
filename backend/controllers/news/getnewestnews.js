const db = require('../../config/SQL/sqlconfig');

const getnewestnews = async (req, res) => {
    try {
        const sql = `SELECT * FROM news ORDER BY created_at DESC LIMIT 5`;

        const [news] = await db.promise().query(sql);

        if (news.length === 0) {
            res.status(404).json({ message: 'No news found' });
        }
        console.log("news")
        res.status(200).json(news);
    } catch (error) {
        
    }
}

module.exports = getnewestnews