const db = require('../../config/SQL/sqlconfig');
const xss = require('xss');
const sendEmail = require('../../config/Nodemailer/nodemailerconfig');

const updateUserInfo = async (req, res) => {
    const { name } = req.body;
    const sanName = xss(name).trim();
    const userId = req?.user?.id;

    if (!userId) {
        return res.status(401).json({ error: "ڕێگەپێنەدراوە" });
    }

    if (!sanName) {
        return res.status(400).json({ error: "ناوەکەت داواکراوە" });
    }

    try {
        const [updateName] = await db.promise().query("select name,email from users where id = ?", [ userId]);

        const user = updateName[0];

        if (user.name === sanName) {
            return res.status(400).json({ error: "ناوی نوێ نابێت هەمان ناوی کۆن بێت" });
        }

        const [updateResult] = await db.promise().query("UPDATE users SET name = ? WHERE id = ?", [sanName, userId]);

        if (updateResult.affectedRows === 0) {
            return res.status(404).json({ error: "هیچ ئەندامێک نەدۆزرایەوە" });
        }

        await sendEmail.changeName(user.email, { name: sanName });
        return res.status(200).json({ message: "ناوەکەی تازە کرایەوە" });
    } catch (error) {
        return res.status(500).json({ error: "کێشەیەک ڕویدا تکایە هەوڵ بدەوە" });
    }
}

module.exports =  updateUserInfo ;