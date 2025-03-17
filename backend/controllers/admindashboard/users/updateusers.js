const db = require('../../../config/SQL/sqlconfig');
const createUploader = require("../../../Middleware/uplode");
const path = require("path");
const fs = require("fs");
const validateEmail = require('../../../utils/checkEmailFormat');
const { upload, getFilePath, uploadDir } = createUploader("profilepic")

const updateuser = async (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ message: 'User ID is required' });
    }

    const { username, email, name, role, bio } = req.body;

    if (!username || !email || !bio || !name || !role) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    if (username < 1 || username > 35) {
        return res.status(400).json({ error: "username must be between 1 and 35 characters" });
    }

    if (name < 1 || name > 35) {
        return res.status(400).json({ error: "Name must be between 1 and 35 characters" });
    }

    if (!validateEmail(email)) {
        return res.status(400).json({ message: 'Invalid email format' });
    }

    if (bio >= 100) {
        return res.status(400).json({ error: "no more than 100 characters" });
    }

    const image = req.file ? getFilePath(req.file.filename) : null;

    try {
        let updatedFields = `username = ?, email = ?, name = ?, role = ?, bio = ?`;
        let values = [username, email, name, role, bio];

        let image_path = null;
        if (image) {
            const oldImage = await db.promise().query("SELECT coverImgURL FROM users WHERE id = ?", [id]);

            image_path = path.join(uploadDir, path.basename(oldImage[0][0].coverImgURL));

            updatedFields += `, coverImgURL = ?`;
            values.push(image);
        }

        values.push(id);

        const sql = `UPDATE users SET ${updatedFields} WHERE id = ?`;
        const [result] = await db.promise().query(sql, values);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (image_path && fs.existsSync(image_path)) {
            fs.unlinkSync(image_path);
        }

        return res.status(200).json({ message: 'User updated successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

const uploadMiddleware = upload.single("profilepic");

module.exports = { updateuser, upload: uploadMiddleware };