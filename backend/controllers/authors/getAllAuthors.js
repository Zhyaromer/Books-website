const db = require('../../config/SQL/sqlconfig');
const xss = require('xss');

// Get all authors
const getAllAuthors = (req, res) => {
    const { language, sorting } = req.query;

    let sql = `
       SELECT id,name,imgURL FROM authors
    `;

    let conditions = [];
    let values = [];

    const sanitizedLanguage = language ? xss(language) : null;

    try {

        if (sanitizedLanguage) {
            conditions.push('authors.language = ?');
            values.push(sanitizedLanguage);
        }

        if (conditions.length > 0) {
            sql += ' WHERE ' + conditions.join(' AND ');
        }

        if(sorting === 'views'){
            sql += ' ORDER BY authors.views DESC';
        }
        else{
            sql += ' ORDER BY authors.created_at DESC';
        }

        db.query(sql, values, (err, result) => {
            if (err) {
                return res.status(500).json({ message: 'Internal Server Error' });
            }

            if (result.length === 0) {
                return res.status(404).json({ message: 'No author found' });
            }

            return res.status(200).json(result);
        });
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports = getAllAuthors;
