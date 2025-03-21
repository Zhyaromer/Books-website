const db = require("../config/SQL/sqlconfig");

const users = () => {
    const sql = `
    CREATE TABLE IF NOT EXISTS users (
    id int auto_increment PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    name varchar(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    coverImgURL TEXT,
    passsowrdResetToken VARCHAR(50),
    passwordResetDate datetime,
    role varchar(70) DEFAULT 'user',
    bio TEXT,
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