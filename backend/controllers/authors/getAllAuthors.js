const db = require('../../config/SQL/sqlconfig');
const xss = require('xss');

// Get all authors
const getAllAuthors = (req, res) => {
    const { language, sorting, page = 1, limit = 12 } = req.query;
    const offset = (page - 1) * limit;

    let countSql = `
        SELECT COUNT(*) as total FROM authors
    `;

    let sql = `
       SELECT id, name, imgURL, bio FROM authors
    `;

    let conditions = [];
    let values = [];

    const sanitizedLanguage = language ? xss(language) : null;

    try {
        if (sanitizedLanguage && sanitizedLanguage !== 'all') {
            conditions.push('language = ?');
            values.push(sanitizedLanguage);
        }

        if (conditions.length > 0) {
            const whereClause = ' WHERE ' + conditions.join(' AND ');
            sql += whereClause;
            countSql += whereClause;
        }

        if(sorting === 'views'){
            sql += ' ORDER BY views DESC';
        }
        else{
            sql += ' ORDER BY created_at DESC';
        }

        sql += ' LIMIT ? OFFSET ?';
        const paginationValues = [...values, parseInt(limit), parseInt(offset)];

        db.query(countSql, values, (countErr, countResult) => {
            if (countErr) {
                console.error('Count query error:', countErr);
                return res.status(500).json({ message: 'Internal Server Error' });
            }

            const total = countResult[0].total;

            db.query(sql, paginationValues, (err, result) => {
                if (err) {
                    console.error('Main query error:', err);
                    return res.status(500).json({ message: 'Internal Server Error' });
                }

                if (result.length === 0) {
                    return res.status(404).json({
                        message: 'No author found',
                        authors: [],
                        total: 0,
                        currentPage: parseInt(page),
                        totalPages: 0
                    });
                }

                return res.status(200).json({
                    authors: result,
                    total: total,
                    currentPage: parseInt(page),
                    totalPages: Math.ceil(total / limit)
                });
            });
        });
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports = getAllAuthors;
