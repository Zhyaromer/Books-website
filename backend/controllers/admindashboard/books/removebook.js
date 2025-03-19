const db = require('../../../config/SQL/sqlconfig');
const fs = require('fs');
const path = require('path');
const createUploader = require("../../../Middleware/uplode");

const { uploadDir } = createUploader("book_cover");

const removeBook = async (req, res) => {
    const bookId = parseInt(req.params.id);

    if (!bookId || isNaN(bookId)) {
        return res.status(400).json({ message: 'Valid Book ID is required' });
    }

    try {
        const [picture] = await db.promise().query('SELECT cover_image FROM books WHERE id = ?', [bookId]);

        const sql = 'DELETE FROM books WHERE id = ?';
        const [result] = await db.promise().query(sql, [bookId]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Book not found' });
        }

        const oldPic = picture[0].cover_image;
        if (oldPic) {
            const oldFilename = path.basename(oldPic);
            const oldFilePath = path.join(uploadDir, oldFilename);

            if (fs.existsSync(oldFilePath)) {
                fs.unlinkSync(oldFilePath);
            }
        }

        return res.status(200).json({ message: 'Book removed successfully' });
    } catch {
        return res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = removeBook;