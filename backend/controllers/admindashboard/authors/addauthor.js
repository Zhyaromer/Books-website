const db = require('../../../config/SQL/sqlconfig');
const createUploader = require("../../../Middleware/uplode");

const { upload, getFilePath } = createUploader("author_cover", {
    fileSize: 3 * 1024 * 1024,
    allowedTypes: /jpeg|jpg|png|webp/
});

const addAuthor = async (req, res) => {
    const { name, bio, language, dateOfBirth, country } = req.body;

    if (!name || !bio || !language || !dateOfBirth || !country) {
        return res.status(400).json({ message: 'Missing required fields' });
    }
    if (!req.file) {
        return res.status(400).json({ message: 'No cover image uploaded' });
    }

    const cover = getFilePath(req.file.filename);

    if (!cover) {
        return res.status(400).json({ message: 'Invalid cover image' });
    }

    try {
        const sql = `INSERT INTO authors (name, bio, language, dateOfBirth, country, imgURL) VALUES (?, ?, ?, ?, ?, ?)`;
        const values = [name, bio, language, dateOfBirth, country, cover];

        const [result] = await db.promise().query(sql, values);

        if (result.affectedRows > 0) {
            return res.status(200).json({ message: 'Author added successfully' });
        } else {
            return res.status(500).json({ message: 'Error adding author' });
        }
    } catch {
        return res.status(500).json({ message: 'Internal server error' });
    }
}

const uploadMiddleware = upload.single("author_cover");

module.exports = { addAuthor, upload: uploadMiddleware };