const bcrypt = require('bcrypt');
const db = require('../../config/SQL/sqlconfig');

const changePassword = async (req, res) => {
    const { oldPassword, newPassword, confirmPassword } = req.body;
    const userId = req?.user?.id;

    if (!userId) {
        return res.status(401).json({ error: "Unauthorized" });
    }

    if (!oldPassword || !newPassword || !confirmPassword) {
        return res.status(400).json({ error: "All fields are required" });
    }

    if (newPassword !== confirmPassword) {
        return res.status(400).json({ error: "New password and confirm password do not match" });
    }

    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(newPassword) || !passwordRegex.test(confirmPassword)) {
        return res.status(400).json({ 
            error: "Password must contain at least one uppercase letter, one number, one special character, and be at least 8 characters long" 
        });
    }

    try {
        const [[user]] = await db.promise().query("SELECT password_hash FROM users WHERE id = ?", [userId]);

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        const isMatch = await bcrypt.compare(oldPassword, user.password_hash);
        
        if (!isMatch) {
            return res.status(400).json({ error: "Old password is incorrect" });
        }
        
        if (await bcrypt.compare(newPassword, user.password_hash)) {
            return res.status(400).json({ error: "New password cannot be the same as the old password" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedNewPassword = await bcrypt.hash(newPassword, salt);

        const [result] = await db.promise().query("UPDATE users SET password_hash = ? WHERE id = ?", [hashedNewPassword, userId]);

        if (result.affectedRows === 0) {
            return res.status(400).json({ error: "Failed to update password" });
        }

        return res.status(200).json({ message: "Password changed successfully" });
    } catch (error) {
        console.error("Error changing password:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
};

module.exports = changePassword;
