const db = require('../../config/SQL/sqlconfig');
const xss = require('xss');

const searching = async (req, res) => {
    const search = `%${xss(req.params.search)}%`;

    try {
        const sql1 = `SELECT name, id, imgURL, bio FROM authors WHERE name LIKE ? limit 25`;
        const sql2 = `SELECT title,genre,cover_image,language,description, id FROM books WHERE title LIKE ? limit 25`;
        const sql3 = `SELECT username, coverImgURL,name, id FROM users WHERE username LIKE ? OR name LIKE ? limit 25`;

        const [authors] = await db.promise().query(sql1 , [search]);
        const [books] = await db.promise().query(sql2 , [search]);
        const [users] = await db.promise().query(sql3 , [search , search]);

        return res.status(200).json({ authors, books, users });
    } catch {
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

module.exports = searching;