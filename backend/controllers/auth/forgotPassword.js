const xss = require("xss");
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const db = require('../../config/SQL/sqlconfig');

const forgotPassword = async (req, res) => {
    const { email } = req.body;
    const sanEmail = xss(email);
    if (!sanEmail) {
        return res.status(400).json({ error: "Email is required" });
    }

    try {
        const sql = `SELECT id FROM users WHERE email = ?`;
        db.query(sql, [sanEmail], (err, result) => {
            if (err) {
                return res.status(500).json({ error: "Internal server error" });
            }

            if (result.length === 0) {
                return res.status(404).json({ error: "User not found" });
            }

            const user = result[0];
            const token = crypto.randomBytes(20).toString("hex");
            const resetLink = `http://localhost:3000/reset-password/${token}`;

            console.log(resetLink);
            const date = Date.now() + 1800000;

            const sql = `UPDATE users SET passsowrdResetToken = ?, passwordResetDate = ? WHERE id = ?`;
            db.query(sql, [token, date, user.id], (err, result) => {
                if (err) {
                    return res.status(500).json({ error: "Internal server error" });
                }

                if (result.affectedRows === 0) {
                    return res.status(500).json({ error: "Internal server error" });
                }

                return res.status(200).json({ message: "Password reset link sent to your email" });
            })
        })
    } catch (error) {
        return res.status(500).json({ error: "Internal server error" });
    }
}

const resetPassword = async (req, res) => {
    try {
        const { token, password } = req.body;
        const sanToken = xss(token);
        const sanPassword = xss(password);

        if (!sanToken || !sanPassword) {
            return res.status(400).json({ error: "Token and password are required" });
        }

        const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (!passwordRegex.test(password)) {
            return res.status(400).json({ error: "Password must contain at least one uppercase letter, one number, and one special character and at least 8 characters" });
        }

        const [rows] = await db.promise().query("SELECT password_hash, passwordResetDate, passwordResetToken, id FROM users WHERE passwordResetToken = ?", [sanToken]);

        if (rows.length === 0) {
            return res.status(404).json({ error: "Invalid or expired token" });
        }

        const user = rows[0];

        if (new Date(user.passwordResetDate) < new Date()) {
            return res.status(400).json({ error: "Token expired" });
        }

        const isMatch = await bcrypt.compare(sanPassword, user.password_hash);
        if (isMatch) {
            return res.status(400).json({ error: "New password cannot be the same as the old password" });
        }

        const hashedPassword = await bcrypt.hash(sanPassword, 10);

        const [updateResult] = await db.promise().query(
            "UPDATE users SET password_hash = ?, passwordResetToken = NULL, passwordResetDate = NULL WHERE id = ?",
            [hashedPassword, user.id]
        );

        if (updateResult.affectedRows === 0) {
            return res.status(500).json({ error: "Failed to update password" });
        }

        return res.status(200).json({ message: "Password reset successful" });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error" });
    }
};

module.exports = { forgotPassword, resetPassword };