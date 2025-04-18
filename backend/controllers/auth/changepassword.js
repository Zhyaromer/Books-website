const bcrypt = require('bcrypt');
const db = require('../../config/SQL/sqlconfig');
const {sendEmail} = require('../../config/Nodemailer/nodemailerconfig');

const changePassword = async (req, res) => {
    const { oldPassword, newPassword, confirmPassword } = req.body;
    const userId = req?.user?.id;

    if (!userId) {
        return res.status(401).json({ message: "ڕێگەپێنەدراوە" });
    }

    if (!oldPassword || !newPassword || !confirmPassword) {
        return res.status(400).json({ message: "هەموو زانیاریەکان داواکراوە" });
    }

    if (newPassword !== confirmPassword) {
        return res.status(400).json({ message: "وشەی نهێنی نوێ و دووپاتکردنەوەی وشەی نهێنی یەک ناگرنەوە" });
    }

    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(newPassword) || !passwordRegex.test(confirmPassword)) {
        return res.status(400).json({
            message: "وشەی نهێنی دەبێت لانیکەم پیتێکی گەورە، ژمارەیەک، هێمایەکی تایبەت لەخۆبگرێت، و لانیکەم ٨ پیت یان زیاتر"
        });
    }

    const promiseDb = db.promise();

    try {
        await promiseDb.beginTransaction();
        const [[user]] = await db.promise().query("SELECT password_hash,username,email FROM users WHERE id = ?", [userId]);

        if (!user) {
            await promiseDb.rollback();
            return res.status(404).json({ message: "هیچ ئەندامێک نەدۆزرایەوە" });
        }

        const isMatch = await bcrypt.compare(oldPassword, user.password_hash);

        if (!isMatch) {
            return res.status(400).json({ message: "وشەی نهێنیە کۆنەکە هەڵەیە" });
        }

        if (await bcrypt.compare(newPassword, user.password_hash)) {
            return res.status(400).json({ message: "وشەی نهێنی نوێ نابێت هەمان وشەی نهێنی کۆن بێت، تکایە وشەی نهێنیەکی تازە بنووسە" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedNewPassword = await bcrypt.hash(newPassword, salt);

        const [result] = await db.promise().query("UPDATE users SET password_hash = ? WHERE id = ?", [hashedNewPassword, userId]);

        if (result.affectedRows === 0) {
            await promiseDb.rollback();
            return res.status(400).json({ message: "نەتوانرا وشەی نهێنی نوێ بکرێت" });
        }

        await promiseDb.commit();
        await sendEmail.changePassword(user.email, { name: user.username });
        return res.status(200).json({ message: "وشەی نهێنیەکەت گۆڕدرا" });
    } catch {
        await promiseDb.rollback();
        return res.status(500).json({ message: "کێشەیەک ڕویدا تکایە هەوڵ بدەوە" });
    }
};

module.exports = changePassword;
