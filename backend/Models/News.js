const db = require("../config/SQL/sqlconfig");

const news = () => {
    const sql = `
    CREATE TABLE IF NOT EXISTS news (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    cover_image TEXT,
    views INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`

    db.query(sql, (err, _) => {
        if (err) {
            console.error("Error creating News table:", err);
        } else {
            console.log("✅ News table is ready.");
        }
    })
}

module.exports = news;