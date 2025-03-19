const db = require('../../../config/SQL/sqlconfig');
const createUploader = require("../../../Middleware/uplode");
const validateEmail = require('../../../utils/checkEmailFormat');
const bcrypt = require('bcrypt');

const { upload, getFilePath } = createUploader("profilepic", {
    fileSize: 3 * 1024 * 1024,
    allowedTypes: /jpeg|jpg|png|webp/
});

const adduser = async (req, res) => {
    const { username, email, password, name, role, bio } = req.body;

    if (!username || !email || !password || !name || !role) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    if (!validateEmail(email)) {
        return res.status(400).json({ message: 'Invalid email format' });
    }

    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
        return res.status(400).json({ message: "Password must contain at least one uppercase letter, one number, and one special character and at least 8 characters" });
    }

    if (!req.file) {
        return res.status(400).json({ message: 'No cover image uploaded' });
    }

    const image = req.file ? getFilePath(req.file.filename) : null;
    try {
        const doesUserExist = `SELECT email, username, id FROM users WHERE email = ? OR username = ?`;

        const [existingUser] = await db.promise().query(doesUserExist, [email, username]);

        if (existingUser.length > 0) {
            if (existingUser[0].email === email) {
                return res.status(400).json({ message: 'Email already exists' });
            } else if (existingUser[0].username === username) {
                return res.status(400).json({ message: 'Username already exists' });
            }
        }

        const addedFields = `username, email, password_hash, name, role, bio, coverImgURL`;

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const values = [username, email, hashedPassword, name, role, bio, image || null];
        const sql = `INSERT INTO users (${addedFields}) VALUES (?, ?, ?, ?, ?, ?, ?)`;

        const [result] = await db.promise().query(sql, values);

        if (result.affectedRows > 0) {
            return res.status(200).json({ message: 'User added successfully' });
        } else {
            return res.status(500).json({ message: 'Error adding user' });
        }
    } catch {
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}

const uploadMiddleware = upload.single("profilepic");

module.exports = { adduser, upload: uploadMiddleware };
