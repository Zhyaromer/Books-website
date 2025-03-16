const db = require('../../../config/SQL/sqlconfig');
const createUploader = require("../../../Middleware/uplode");

const { upload, getFilePath } = createUploader("series_cover", {
    fileSize: 3 * 1024 * 1024,
    allowedTypes: /jpeg|jpg|png|webp/
});

const addseries = async (req, res) => {
    const { title, state, description } = req.body;

    if (!title || !state || !description) {
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
        const sql = `INSERT INTO book_series (series_title, cover_img, description, state) VALUES (?, ?, ?, ?)`;
        const values = [title, cover, description, state];

        const [result] = await db.promise().query(sql, values);

        if (result.affectedRows > 0) {
            return res.status(200).json({ message: 'Book Series added successfully' });
        } else {
            return res.status(500).json({ message: 'Error adding book series' });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

const uploadMiddleware = upload.single("series_cover");

module.exports = { addseries, upload: uploadMiddleware };