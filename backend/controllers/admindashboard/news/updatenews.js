const db = require('../../../config/SQL/sqlconfig');
const createUploader = require("../../../Middleware/uplode");
const path = require("path");
const fs = require("fs");

const { upload, getFilePath, uploadDir } = createUploader("news_cover", {
    fileSize: 3 * 1024 * 1024,
    allowedTypes: /jpeg|jpg|png|webp/
})

const updatenews = async (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ message: 'News ID is required' });    
    }

    const { title, description } = req.body;

    if (!title || !description) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    const news_cover = req.file ? getFilePath(req.file.filename) : null;

    const promiseDb = db.promise();
    try {
        await promiseDb.beginTransaction();

        let updateFields = `title = ?, description = ?`;
        let values = [title, description];

        let news_cover_path = null;
        if (news_cover) {
            const sql = `SELECT cover_image FROM news WHERE id = ?`;
            const [result] = await promiseDb.query(sql, [id]);

            if (result.length === 0) {
                await promiseDb.rollback();
                return res.status(404).json({ message: 'News not found' });
            }

            news_cover_path = path.join(uploadDir, path.basename(result[0].cover_image));

            updateFields += `, cover_image = ?`;
            values.push(news_cover);
        }

        values.push(id);

        const sql = `UPDATE news SET ${updateFields} WHERE id = ?`;
        const [result] = await promiseDb.query(sql, values);

        if (result.affectedRows === 0) {
            await promiseDb.rollback();
            return res.status(404).json({ message: 'News not found' });
        }

        if (news_cover_path && fs.existsSync(news_cover_path)) {
            fs.unlinkSync(news_cover_path);
        }

        await promiseDb.commit();
        return res.status(200).json({ message: 'News updated successfully' });
    } catch {
        await promiseDb.rollback();
        return res.status(500).json({ message: 'Error updating news' });
    }
}

const uploadMiddleware = upload.single("news_cover");

module.exports = { updatenews, upload: uploadMiddleware };