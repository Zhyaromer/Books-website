const db = require("../config/sql/sqlConfig");

const user_reads = () => {
    const sql = `
    CREATE TABLE IF NOT EXISTS user_reads (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    book_id INT,
    UNIQUE(user_id, book_id),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (book_id) REFERENCES books(id) ON DELETE CASCADE
    ) `

    db.query(sql, (err, _) => {
        if (err) {
            console.error("Error creating user_reads table:", err);
        } else {
            console.log("✅ user_reads table is ready.");
        }
    });
};

module.exports = user_reads;