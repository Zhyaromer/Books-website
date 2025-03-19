const db = require('../../../config/SQL/sqlconfig');
const createUploader = require("../../../Middleware/uplode"); 

const { upload, getFilePath } = createUploader("book_cover", {
    fileSize: 5 * 1024 * 1024, 
    allowedTypes: /jpeg|jpg|png|webp/ 
});

const addNewBook = async (req, res) => {
    const { title, author_id, series_id, part_num, language, published_date, page_count, description, genre } = req.body;
    if (!req.file) {
        return res.status(400).json({ message: 'No cover image uploaded' });
    }
    const filename = getFilePath(req.file.filename);

    if (!title || !author_id || !language || !page_count || !description || !genre || !filename) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    try {
        const sql = `INSERT INTO books (title, author_id, series_id, part_num, language, published_date, page_count, description, genre, cover_image) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
        const values = [title, author_id, series_id ? series_id : null, part_num ? part_num : null, language, published_date ? published_date : null, page_count, description, genre, filename];

        const [result] = await db.promise().query(sql, values);

        if (result.affectedRows > 0) {
            return res.status(200).json({ message: 'Book added successfully' });
        } else {
            return res.status(500).json({ message: 'Error adding book' });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }

}

const uploadMiddleware = upload.single("cover_image");

module.exports = { addNewBook, upload: uploadMiddleware };
