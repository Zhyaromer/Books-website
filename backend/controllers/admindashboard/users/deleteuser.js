const db = require('../../../config/SQL/sqlconfig');
const createUploader = require("../../../Middleware/uplode");
const path = require("path");
const fs = require("fs");
const { uploadDir } = createUploader("profilepic");

const deleteUser = async (req, res) => {
    const id = req.params.id;

    if (!id) {
        return res.status(400).json({ message: 'User ID is required' });
    }

    try {
        const [picture] = await db.promise().query('SELECT coverImgURL FROM users WHERE id = ?', [id]);

      if (picture.length === 0) {
        return res.status(404).json({ message: 'User not found' });
      }

      const [result] = await db.promise().query('DELETE FROM users WHERE id = ?', [id]);

      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'User not found' });
      }

      const coverImgURL = picture[0].coverImgURL;
      if (coverImgURL) {
        const filename = path.basename(coverImgURL);
        const filePath = path.join(uploadDir, filename);

        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }
      }

      return res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error deleting user' });
    }
}

module.exports = deleteUser;