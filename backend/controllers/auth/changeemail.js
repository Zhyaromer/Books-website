const db = require('../../config/SQL/sqlconfig');
const xss = require('xss');
const validateEmail = require('../../utils/checkEmailFormat');

const changeemail = async (req, res) => {
    const { email } = req.body;
    const sanEmail = xss(email).trim();
    const userId = req?.user?.id;

    if (!userId) {
        return res.status(401).json({ error: "Unauthorized" });
    }

    if (!sanEmail) {
        return res.status(400).json({ error: "email is required" });
    }

    if (!validateEmail(email)) {
        return res.status(400).json({ error: "Invalid email format" });
    }

    try {
        const [updateEmail] = await db.promise().query("select email from users where id = ?", [ userId]);

        const user = updateEmail[0];

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        if (user.email === sanEmail) {
            return res.status(400).json({ error: "New email cannot be the same as the old email" });
        }

        const [checkEmail] = await db.promise().query("SELECT email FROM users WHERE email = ?", [sanEmail]);

        if (checkEmail.length > 0) {
            return res.status(400).json({ error: "email already exists, please choose another one" });
        }

        const [updateResult] = await db.promise().query("UPDATE users SET email = ? WHERE id = ?", [sanEmail, userId]);

        if (updateResult.affectedRows === 0) {
            return res.status(404).json({ error: "User not found" });
        }

        return res.status(200).json({ message: "email updated successfully" });
    } catch (error) {
        return res.status(500).json({ error: "Internal server error" });
    }
  
}

module.exports =  changeemail ;