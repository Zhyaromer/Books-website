const db = require('../../../config/SQL/sqlconfig');
const createUploader = require("../../../Middleware/uplode");

const { upload, getFilePath } = createUploader("news_cover", {
    fileSize: 3 * 1024 * 1024,
    allowedTypes: /jpeg|jpg|png|webp/
});

const addnews = async (req, res) => {
    const { title, description } = req.body;

    if (!title || !description) {
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
        let sql = `INSERT INTO news (title, cover_image, description) VALUES (?, ?, ?)`;
        let values = [title, cover, description];

        const [result] = await db.promise().query(sql, values);

        if (result.affectedRows > 0) {
            return res.status(200).json({ message: 'News added successfully' });
        } else {
            return res.status(500).json({ message: 'Error adding news' });
        }
    } catch {
        return res.status(500).json({ message: 'Internal server error' });
    }
}

const uploadMiddleware = upload.single("news_cover");

module.exports = { addnews, upload: uploadMiddleware };