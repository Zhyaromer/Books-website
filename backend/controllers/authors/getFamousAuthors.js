const db = require('../../config/SQL/sqlconfig');

const getFamousAuthors = (req, res) => {
    try {
        const sql = `
         SELECT id,name,imgURL FROM authors ORDER BY authors.views DESC LIMIT 5
        `;

        db.query(sql, (err, result) => {
            if (err) {
                return res.status(500).json({ message: 'Internal Server Error' });
            }

            if (result.length === 0) {
                return res.status(404).json({ message: 'No author found' });
            }

            return res.status(200).json(result);
        });
    } catch {
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}

module.exports = getFamousAuthors;