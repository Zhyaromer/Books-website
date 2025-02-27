const db = require('../../config/SQL/sqlconfig');
const xss = require('xss');
const validateEmail = require('../../utils/checkEmailFormat');
const sendEmail = require('../../config/Nodemailer/nodemailerconfig');

const changeemail = async (req, res) => {
    const { email } = req.body;
    const sanEmail = xss(email).trim();
    const userId = req?.user?.id;

    if (!userId) {
        return res.status(401).json({ error: " ڕێگەپێنەدراوە" });
    }

    if (!sanEmail) {
        return res.status(400).json({ error: "ئیمەیل داواکراوە" });
    }

    if (!validateEmail(email)) {
        return res.status(400).json({ error: "ئیمەیڵەکەت دروست نیە" });
    }

    try {
        const [updateEmail] = await db.promise().query("select email from users where id = ?", [ userId]);

        const user = updateEmail[0];

        if (!user) {
            return res.status(404).json({ error: "هیچ ئەندامێک نەدۆزرایەوە" });
        }

        if (user.email === sanEmail) {
            return res.status(400).json({ error: "ئیمەیلی نوێ نابێت هەمان ئیمەیلی کۆن بێت" });
        }

        const [checkEmail] = await db.promise().query("SELECT email FROM users WHERE email = ?", [sanEmail]);

        if (checkEmail.length > 0) {
            return res.status(400).json({ error: "ئەم ئیمەیلە پێشتر بەکار هاتووە، تکایە یەکێکی تر هەڵبژێرە" });
        }

        const [updateResult] = await db.promise().query("UPDATE users SET email = ? WHERE id = ?", [sanEmail, userId]);

        if (updateResult.affectedRows === 0) {
            return res.status(404).json({ error: "هیچ ئەندامێک نەدۆزرایەوە" });
        }

        sendEmail.changeemail(sanEmail,{ name: user.username, email: sanEmail });
        return res.status(200).json({ message: "ئیمەیڵەکەت تازە کرایەوە" });
    } catch (error) {
        return res.status(500).json({ error: "کێشەیەک ڕویدا تکایە هەوڵ بدەوە" });
    }
}

module.exports =  changeemail ;