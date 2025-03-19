const db = require("../../config/SQL/sqlconfig");

const getuserprofile = async (req, res) => {
    const userId = req?.user?.id;
    if (!userId) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    try {
        const sql = "SELECT id, name, coverImgURL FROM users WHERE id = ?";
    db.query(sql, [userId], (err, results) => {
        if (err) return res.status(500).json({ message: "Database error" });
        if (results.length === 0) return res.status(404).json({ message: "User not found" });

        res.json(results[0]);
    });
    } catch {   
        return res.status(500).json({ message: "Internal server error" });
    }
}

module.exports = { getuserprofile };