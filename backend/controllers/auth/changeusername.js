const db = require('../../config/SQL/sqlconfig');
const xss = require('xss');
const {sendEmail} = require('../../config/Nodemailer/nodemailerconfig');

const changeusername = async (req, res) => {
    const { username } = req.body;
    const sanUserName = xss(username).trim();
    const userId = req?.user?.id;

    if (!sanUserName) {
        return res.status(400).json({ message: "username is required" });
    }

    if (!userId) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    if (sanUserName.trim() === '') {
        return res.status(400).json({ message: "enter a valid username" });
    }

    if (sanUserName.length < 1 || sanUserName.length > 35) {
        return res.status(400).json({ message: "username must be between 1 and 35 characters" });
    }

    try {
        const [updateUsername] = await db.promise().query("select username,email from users where id = ?", [ userId]);

        const user = updateUsername[0];

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (user.username === sanUserName) {
            return res.status(400).json({ message: "New username cannot be the same as the old username" });
        }

        const [checkUserName] = await db.promise().query("SELECT username FROM users WHERE username = ?", [sanUserName]);

        if (checkUserName.length > 0) {
            return res.status(400).json({ message: "Username already exists, please choose another one" });
        }

        const [updateResult] = await db.promise().query("UPDATE users SET username = ? WHERE id = ?", [sanUserName, userId]);

        if (updateResult.affectedRows === 0) {
            return res.status(404).json({ message: "User not found" });
        }

        sendEmail.changeusername(user.email, { name: sanUserName });
        return res.status(200).json({ message: "username updated successfully" });
    } catch {
        return res.status(500).json({ message: "Internal server error" });
    }
  
}

module.exports =  changeusername ;