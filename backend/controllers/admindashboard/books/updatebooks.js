const db = require('../../../config/SQL/sqlconfig');
const fs = require('fs');
const path = require('path');
const createUploader = require("../../../Middleware/uplode");

const { upload, getFilePath, uploadDir } = createUploader("book_cover", {
    fileSize: 5 * 1024 * 1024,
    allowedTypes: /jpeg|jpg|png|webp/
});

const updateBook = async (req, res) => {
    const { id } = req.params;
    const bookId = parseInt(id);

    if (!bookId || isNaN(bookId)) {
        return res.status(400).json({ error: 'Valid Book ID is required' });
    }

    const filename = req?.file?.filename ? getFilePath(req.file.filename) : null;
    const { title, author_id, series_id, part_num, language, published_date, page_count, description, genre } = req.body;

    if (!title || !author_id || !language || !page_count || !description || !genre) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    const promiseDb = db.promise();

    try {
        promiseDb.beginTransaction();

        let updateFields =
            `title = ?, author_id = ?, series_id = ?, part_num = ?, language = ?, 
            published_date = ?, page_count = ?, description = ?, genre = ?`;

        const formattedDate = published_date && !isNaN(Date.parse(published_date))
            ? new Date(published_date).toISOString().split('T')[0]
            : null;

        let parsedSeriesId = series_id && !isNaN(series_id) ? parseInt(series_id) : null;
        let parsedPartNum = part_num && !isNaN(part_num) ? parseInt(part_num) : null;

        let values = [
            title,
            author_id,
            parsedSeriesId,
            parsedPartNum,
            language,
            formattedDate,
            page_count,
            description,
            genre
        ];
        
        let oldCoverPath = null;

        if (filename) {
            const [userResult] = await promiseDb.query("SELECT cover_image FROM books WHERE id = ?", [bookId]);
            if (userResult.length === 0) {
                await promiseDb.rollback();
                return res.status(404).json({ error: "Book not found" });
            }

            oldCoverPath = path.join(uploadDir, path.basename(userResult[0].cover_image));

            updateFields += `, cover_image = ?`;
            values.push(filename);
        }

        values.push(bookId);

        const sql = `UPDATE books SET ${updateFields} WHERE id = ?`;
        const [result] = await promiseDb.query(sql, values);

        if (result.affectedRows > 0) {
            await promiseDb.commit();
            if (oldCoverPath && fs.existsSync(oldCoverPath)) {
                fs.unlinkSync(oldCoverPath);
            }
            return res.status(200).json({ message: 'Book updated successfully' });
        } else {
            await promiseDb.rollback();
            return res.status(500).json({ message: 'Error updating book' });
        }
    } catch (error) {
        await promiseDb.rollback();
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

const uploadMiddleware = upload.single("cover_image");

module.exports = { updateBook, upload: uploadMiddleware };