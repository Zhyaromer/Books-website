const db = require("../config/SQL/sqlconfig");

const suggestions = () => {
    const sql = `
    CREATE TABLE IF NOT EXISTS suggestions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    book_id INT,
    UNIQUE(user_id, book_id),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (book_id) REFERENCES books(id) ON DELETE CASCADE
    ) `

    db.query(sql, (err, _) => {
        if (err) {
            console.error("Error creating suggestions table:", err);
        } else {
            console.log("✅ suggestions table is ready.");
        }
    });
};

module.exports = suggestions;