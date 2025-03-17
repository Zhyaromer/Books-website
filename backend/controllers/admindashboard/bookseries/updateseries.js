const db = require("../../../config/SQL/sqlconfig");
const fs = require("fs");
const path = require("path");
const createUploader = require("../../../Middleware/uplode");

const { upload, getFilePath, uploadDir } = createUploader("series_cover", {
    fileSize: 4 * 1024 * 1024,
    allowedTypes: /jpeg|jpg|png|webp/
});

const updateseries = async (req, res) => {
    const series_id = req.params.id;

    if (!series_id) {
        return res.status(400).json({ message: 'Series ID is required' });
    }

    const { title, state, description } = req.body;

    if (!title || !state || !description) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    const series_cover = req.file ? getFilePath(req.file.filename) : null;

    const promiseDb = db.promise();
    try {
        await promiseDb.beginTransaction();

        let updatedFields = `series_title = ?, state = ?, description = ?`;
        let values = [title, state, description];

        let series_cover_path = null;
        if (series_cover) {
            const sql = `SELECT cover_img FROM book_series WHERE id = ?`;
            const [result] = await db.promise().query(sql, [series_id]);

            if (result.length === 0) {
                return res.status(404).json({ message: 'Series not found' });
            }

            series_cover_path = path.join(uploadDir, path.basename(result[0].cover_img));

            values.push(series_cover);
            updatedFields += ', cover_img = ?';
        }
        values.push(series_id);

        const sql = `UPDATE book_series SET ${updatedFields} WHERE id = ?`;
        const [result] = await db.promise().query(sql, values);

        if (result.affectedRows === 0) {
            await promiseDb.rollback();
            return res.status(404).json({ message: 'Series not found' });
        }

        if (series_cover_path && fs.existsSync(series_cover_path)) {
            fs.unlinkSync(series_cover_path);
        }

        await promiseDb.commit();
        return res.status(200).json({ message: 'Series updated successfully' });
    } catch (error) {
        await promiseDb.rollback();
        return res.status(500).json({ message: 'Internal server error' });
    }
}

const uploader = upload.single("series_cover");

module.exports = { updateseries, upload: uploader };