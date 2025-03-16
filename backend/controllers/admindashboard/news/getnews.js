const db = require('../../../config/SQL/sqlconfig');

const getNews = async (req, res) => {
    try {
        const [news] = await db.promise().query('SELECT * FROM news');

        if (news.length === 0) {
            return res.status(404).json({ message: 'No news found' });
        }

        return res.status(200).json(news);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = getNews;