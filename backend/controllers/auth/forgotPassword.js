const xss = require("xss");
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const db = require('../../config/SQL/sqlconfig');
const sendEmail = require('../../config/Nodemailer/nodemailerconfig');

const forgotPassword = async (req, res) => {
    const { email } = req.body;
    const sanEmail = xss(email);

    if (!sanEmail) {
        return res.status(400).json({ error: "Email is required" });
    }

    try {
        const sql = `SELECT id,email,username,passwordResetDate FROM users WHERE email = ?`;
        db.query(sql, [sanEmail], (err, result) => {
            if (err) {
                return res.status(500).json({ error: "Internal server error" });
            }

            if (result.length === 0) {
                return res.status(404).json({ error: "User not found" });
            }

            const user = result[0];

            const resetDate = new Date(user?.passwordResetDate || 0);
            const currentDate = new Date();
            console.log(resetDate, currentDate);
            console.log(resetDate < currentDate);

            if (currentDate < resetDate) {
                console.log("Token not expired");
                return res.status(400).json({ error: "Token not expired" });
            }

            const token = crypto.randomBytes(20).toString("hex");
            const resetLink = `http://localhost:5173/changepassword/${token}`;

            const expirationTime = new Date(Date.now() + 30 * 60 * 1000);

            const sql = `UPDATE users SET passsowrdResetToken = ?, passwordResetDate = ? WHERE id = ?`;
            db.query(sql, [token, expirationTime, user.id], (err, result) => {
                if (err) {
                    console.error(err);
                    return res.status(500).json({ error: "Internal server error" });
                }

                if (result.affectedRows === 0) {
                    return res.status(500).json({ error: "Internal server error" });
                }

                sendEmail.passwordReset(user.email, { name: user.username, resetLink });
                return res.status(200).json({ message: "Password reset link sent to your email" });
            });
        });
    } catch (error) {
        return res.status(500).json({ error: "Internal server error" });
    }
};

const resetPassword = async (req, res) => {
    try {
        const { token, password, confirmPassword } = req.body;
        const sanToken = xss(token);
        const sanPassword = xss(password);
        const sanConfirmPassword = xss(confirmPassword);

        if (!sanToken || !sanPassword || !sanConfirmPassword) {
            return res.status(400).json({ error: "Token and password are required" });
        }

        const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (!passwordRegex.test(sanPassword)) {
            return res.status(400).json({ error: "Password must contain at least one uppercase letter, one number, and one special character and at least 8 characters" });
        }

        if (!passwordRegex.test(sanConfirmPassword)) {
            return res.status(400).json({ error: "Password must contain at least one uppercase letter, one number, and one special character and at least 8 characters" });
        }

        if (sanPassword !== sanConfirmPassword) {
            return res.status(400).json({ error: "Passwords do not match" });
        }

        const [rows] = await db.promise().query("SELECT password_hash, passwordResetDate, passsowrdResetToken, id, email, username FROM users WHERE passsowrdResetToken = ?", [sanToken]);

        if (rows.length === 0) {
            return res.status(404).json({ error: "Invalid or expired token" });
        }

        const user = rows[0];

        const resetDate = new Date(user.passwordResetDate);
        const currentDate = new Date();

        if (currentDate > resetDate) {
            return res.status(400).json({ error: "Token expired" });
        }

        const isMatch = await bcrypt.compare(sanPassword, user.password_hash);
        if (isMatch) {
            return res.status(400).json({ error: "New password cannot be the same as the old password" });
        }

        const hashedPassword = await bcrypt.hash(sanPassword, 10);

        const [updateResult] = await db.promise().query(
            "UPDATE users SET password_hash = ?, passsowrdResetToken = ?, passwordResetDate = ? WHERE id = ?",
            [hashedPassword, null, null, user.id]
        );

        if (updateResult.affectedRows === 0) {
            return res.status(500).json({ error: "Failed to update password" });
        }

        sendEmail.changePassword(user.email, { name: user.username });
        return res.status(200).json({ message: "Password reset successful" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error" });
    }
};

module.exports = { forgotPassword, resetPassword };