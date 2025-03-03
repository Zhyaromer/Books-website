const db = require('../../config/SQL/sqlconfig');
const xss = require('xss');

// Get all authors
const getAllAuthors = (req, res) => {
    const { language, sorting } = req.query;
    console.log(sorting);

    let sql = `
       SELECT id,name,imgURL,bio FROM authors
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
            sql += ' WHERE ' + conditions.join(' AND ');
        }

        if(sorting === 'views'){
            sql += ' ORDER BY views DESC';
        }
        else{
            sql += ' ORDER BY created_at DESC';
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
