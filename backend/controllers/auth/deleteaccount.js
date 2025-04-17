const db = require('../../config/SQL/sqlconfig');
const {sendEmail} = require('../../config/Nodemailer/nodemailerconfig');

const deleteaccount = async (req, res) => {
    const userId = req?.user?.id;

    if (!userId) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    try {
        const [user] = await db.promise().query("SELECT username, email FROM users WHERE id = ?", [userId]);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const [result] = await db.promise().query("DELETE FROM users WHERE id = ?", [userId]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "User not found" });
        }

        sendEmail.deleteAccount(user[0].email, { name: user[0].username });
        return res.status(200).json({ message: "Account deleted successfully" });
    } catch {
        return res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = deleteaccount;
