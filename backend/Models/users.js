const db = require("../config/sql/sqlConfig");

const users = () => {
    const sql = `
    CREATE TABLE IF NOT EXISTS users (
         id int auto_increment PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    coverImgURL TEXT,
    passsowrdResetToken VARCHAR(30),
    passwordResetDate DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`

    db.query(sql, (err, _) => {
        if (err) {
            console.error("Error creating users table:", err);
        } else {
            console.log("✅ users table is ready.");
        }
    });
}

module.exports = users