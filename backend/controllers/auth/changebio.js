const db = require('../../config/SQL/sqlconfig');
const xss = require('xss');

const changebio = async (req, res) => {
    const { bio } = req.body;
    const sanBio = xss(bio).trim();
    const userId = req?.user?.id;

    if (!userId) {
        return res.status(401).json({ message: "ڕێگەپێنەدراوە" });
    }

    if (!sanBio) {
        return res.status(400).json({ message: "بیۆکەت داواکراوە" });
    }

    if (sanBio.length >= 100) {
        return res.status(400).json({ message: "no more than 100 characters" });
    }

    try {
        const [updateBio] = await db.promise().query("select bio,email from users where id = ?", [userId]);

        if (updateBio.length === 0) {
            return res.status(404).json({ message: "هیچ ئەندامێک نەدۆزرایەوە" });
        }

        const [updateResult] = await db.promise().query("UPDATE users SET bio = ? WHERE id = ?", [sanBio, userId]);

        if (updateResult.affectedRows === 0) {
            return res.status(404).json({ message: "هیچ ئەندامێک نەدۆزرایەوە" });
        }

        return res.status(200).json({ message: "بیۆکەت تازە کرایەوە" });
    } catch {
        return res.status(500).json({ message: "کێشەیەک ڕویدا تکایە هەوڵ بدەوە" });
    }
}

module.exports = changebio;