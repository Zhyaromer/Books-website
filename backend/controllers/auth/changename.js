const db = require('../../config/SQL/sqlconfig');
const xss = require('xss');
const sendEmail = require('../../config/Nodemailer/nodemailerconfig');

const updateUserInfo = async (req, res) => {
    const { name } = req.body;
    const sanName = xss(name).trim();
    const userId = req?.user?.id;

    if (!userId) {
        return res.status(401).json({ message: "ڕێگەپێنەدراوە" });
    }

    if (!sanName) {
        return res.status(400).json({ message: "ناوەکەت داواکراوە" });
    }

    if (sanName.trim() === '') {
        return res.status(400).json({ message: "enter a valid name" });
    }

    if (sanName.length < 1 || sanName.length > 35) {
        return res.status(400).json({ message: "Name must be between 1 and 35 characters" });
    }

    try {
        const [updateName] = await db.promise().query("select name,email from users where id = ?", [userId]);

        const user = updateName[0];

        if (user.name === sanName) {
            return res.status(400).json({ message: "ناوی نوێ نابێت هەمان ناوی کۆن بێت" });
        }

        const [updateResult] = await db.promise().query("UPDATE users SET name = ? WHERE id = ?", [sanName, userId]);

        if (updateResult.affectedRows === 0) {
            return res.status(404).json({ message: "هیچ ئەندامێک نەدۆزرایەوە" });
        }

        await sendEmail.changeName(user.email, { name: sanName });
        return res.status(200).json({ message: "ناوەکەی تازە کرایەوە" });
    } catch {
        return res.status(500).json({ message: "کێشەیەک ڕویدا تکایە هەوڵ بدەوە" });
    }
}

module.exports = updateUserInfo;