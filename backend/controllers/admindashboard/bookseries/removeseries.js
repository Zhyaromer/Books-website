const db = require('../../../config/SQL/sqlconfig');
const createUploader = require("../../../Middleware/uplode");
const path = require("path");
const fs = require("fs");
const { uploadDir } = createUploader("series_cover");

const removeSeries = async (req, res) => {
    const seriesid = req.params.id;

    if (!seriesid) {
        return res.status(400).json({ message: 'Series ID is required' });
    }

    try {
        const [series] = await db.promise().query('SELECT cover_img FROM book_series WHERE id = ?', [seriesid]);

        if (series.length === 0) {
            return res.status(404).json({ message: 'series not found' });
        }

        const [result] = await db.promise().query('DELETE FROM book_series WHERE id = ?', [seriesid]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'series not found' });
        }

        const coverImage = series[0].cover_img;
        if (coverImage) {
            const filename = path.basename(coverImage);
            const filePath = path.join(uploadDir, filename);

            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
            }
        }
        return res.status(200).json(result);
    } catch {
        return res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = removeSeries