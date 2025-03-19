const db = require('../../config/SQL/sqlconfig');
const xss = require('xss');

const getAllNews = async (req, res) => {
    const { category, sorting, page = 1, limit = 12 } = req.query;
    const offset = (page - 1) * limit;

    try {
        let countSql = `SELECT COUNT(*) as total FROM news`;
        let sql = `SELECT * FROM news`;
        let conditions = [];
        let values = [];

        if (category && category !== 'all') {
            const sanitizedCategory = xss(category);
            conditions.push('category = ?');
            values.push(sanitizedCategory);
        }

        if (conditions.length > 0) {
            const whereClause = ' WHERE ' + conditions.join(' AND ');
            sql += whereClause;
            countSql += whereClause;
        }

        if (sorting === 'newest') {
            sql += ' ORDER BY created_at DESC';
        } else if (sorting === 'oldest') {
            sql += ' ORDER BY created_at ASC';
        } else if (sorting === 'views') {
            sql += ' ORDER BY views DESC';
        } else {
            sql += ' ORDER BY created_at DESC';
        }

        sql += ' LIMIT ? OFFSET ?';
        const paginationValues = [...values, parseInt(limit), parseInt(offset)];

        const [countResult] = await db.promise().query(countSql, values);
        const total = countResult[0].total;

        const [news] = await db.promise().query(sql, paginationValues);

        if (news.length === 0) {
            return res.status(404).json({
                message: 'No news found',
                news: [],
                total: 0,
                currentPage: parseInt(page),
                totalPages: 0
            });
        }

        res.status(200).json({
            news,
            total,
            currentPage: parseInt(page),
            totalPages: Math.ceil(total / limit)
        });
    } catch {
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = getAllNews;