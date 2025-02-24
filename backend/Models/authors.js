const db = require("../config/SQL/sqlconfig");

const authors = () => {
    const sql = `
   CREATE TABLE IF NOT EXISTS authors (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    bio TEXT,
    imgURL TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`

    db.query(sql, (err, _) => {
        if (err) {
            console.error("Error creating authors table:", err);
        } else {
            console.log("✅ authors table is ready.");
        }
    });
};

module.exports = authors;
