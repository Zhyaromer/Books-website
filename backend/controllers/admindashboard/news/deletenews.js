const db = require('../../../config/SQL/sqlconfig');
const createUploader = require("../../../Middleware/uplode");
const path = require("path");
const fs = require("fs");
const { uploadDir } = createUploader("news_cover");

const removeNews = async (req, res) => {
    const newsid = req.params.id;

    if (!newsid) {
        return res.status(400).json({ message: 'News ID is required' });
    }

    try {
        const [pic] = await db.promise().query('SELECT cover_image FROM news WHERE id = ?', [newsid]);

        const [result] = await db.promise().query('DELETE FROM news WHERE id = ?', [newsid]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'News not found' });
        }

        const coverImage = pic[0].cover_image;
        if (coverImage) {
            const filename = path.basename(coverImage);
            const filePath = path.join(uploadDir, filename);

            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
            }
        }
        return res.status(200).json(result);
    } catch {
        return res.status(500).json({ message: 'Error deleting news' });
    }
}

module.exports = removeNews;