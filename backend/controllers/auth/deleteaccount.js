const db = require('../../config/SQL/sqlconfig');

const deleteaccount = async (req, res) => {
    const userId = req?.user?.id;

    if (!userId) {
        return res.status(401).json({ error: "Unauthorized" });
    }

    try {
        const [result] = await db.promise().query("DELETE FROM users WHERE id = ?", [userId]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "User not found" });
        }

        return res.status(200).json({ message: "Account deleted successfully" });
    } catch (error) {
        console.error("Error deleting account:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
};

module.exports = deleteaccount;
