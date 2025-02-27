const db = require('../../config/SQL/sqlconfig');
const xss = require('xss');
const sendEmail = require('../../config/Nodemailer/nodemailerconfig');

const updateUserInfo = async (req, res) => {
    const { name } = req.body;
    const sanName = xss(name).trim();
    const userId = req?.user?.id;

    if (!userId) {
        return res.status(401).json({ error: "Unauthorized" });
    }

    if (!sanName) {
        return res.status(400).json({ error: "Name is required" });
    }

    try {
        const [updateName] = await db.promise().query("select name from users where id = ?", [ userId]);

        const user = updateName[0];

        if (user.name === sanName) {
            return res.status(400).json({ error: "New name cannot be the same as the old name" });
        }

        const [updateResult] = await db.promise().query("UPDATE users SET name = ? WHERE id = ?", [sanName, userId]);

        if (updateResult.affectedRows === 0) {
            return res.status(404).json({ error: "User not found" });
        }

        sendEmail.changeName(user.email, { name: sanName });
        return res.status(200).json({ message: "Name updated successfully" });
    } catch (error) {
        return res.status(500).json({ error: "Internal server error" });
    }
  
}

module.exports =  updateUserInfo ;