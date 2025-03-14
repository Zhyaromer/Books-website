const db = require("../../config/SQL/sqlconfig");

const getuserprofile = async (req, res) => {
    const userId = req?.user?.id;
    if (!userId) {
        return res.status(401).json({ error: "Unauthorized" });
    }

    try {
        const sql = "SELECT id, name, coverImgURL FROM users WHERE id = ?";
    db.query(sql, [userId], (err, results) => {
        if (err) return res.status(500).json({ error: "Database error" });
        if (results.length === 0) return res.status(404).json({ error: "User not found" });

        res.json(results[0]);
    });
    } catch (error) {   
        console.error(error);
        return res.status(500).json({ error: "Internal server error" });
    }
}

module.exports = { getuserprofile };