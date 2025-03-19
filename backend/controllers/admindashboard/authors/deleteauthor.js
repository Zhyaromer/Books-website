const db = require('../../../config/SQL/sqlconfig');
const createUploader = require("../../../Middleware/uplode"); 
const path = require("path");
const fs = require("fs");
const { uploadDir } = createUploader("author_cover");

const removeAuthor = async (req, res) => {
    const authorid = req.params.id;

    if (!authorid) {
        return res.status(400).json({ message: 'author ID is required' });
    }

    try {
        const [author] = await db.promise().query('SELECT imgURL FROM authors WHERE id = ?', [authorid]);

        if (author.length === 0) {
            return res.status(404).json({ message: 'author not found' });
        }

        const coverImage = author[0].imgURL;

        if (coverImage) {
            const filename = path.basename(coverImage);
            const filePath = path.join(uploadDir, filename);

            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
            }
        }

        const sql = 'DELETE FROM authors WHERE id = ?';
        const [result] = await db.promise().query(sql, [authorid]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'author not found' });
        }

        return res.status(200).json({ message: 'author deleted successfully' });
    } catch {
        return res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = removeAuthor;