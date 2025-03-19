const db = require('../../config/SQL/sqlconfig');
const xss = require('xss');

const getmemberinfo = async (req, res) => {
    const username  = xss(req?.query?.username);

    if (!username) {
        return res.status(404).json({ message: "not found" });
    }

    try {
        const sql = `select name,username,coverImgURL,bio from users where username = ?`;

        const [result] = await db.promise().query(sql, [username]);

        if (result.length === 0) {
            return res.status(404).json({ message: "User not found" });
        }

        return res.status(200).json(result[0]);
    } catch {
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

module.exports = getmemberinfo;