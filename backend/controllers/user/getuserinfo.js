const db = require('../../config/SQL/sqlconfig');

const getUserInfo = async (req, res) => {
    const user_id = req?.user?.id;

    if (!user_id) {
        return res.status(401).json({ error: "Unauthorized" });
    }

    try {
        const sql = `select username, coverImgURL,bio,name,email from users where id = ?`;

        const [result] = await db.promise().query(sql, [user_id]);

        if (result.length === 0) {
            return res.status(404).json({ error: "User not found" });
        }

        return res.status(200).json(result[0]);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}

module.exports = getUserInfo;