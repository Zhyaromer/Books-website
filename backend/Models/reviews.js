const db = require("../config/SQL/sqlconfig");

const reviews = () => {
    const sql = `
    CREATE TABLE IF NOT EXISTS reviews (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    book_id INT,
    rating INT CHECK (rating BETWEEN 1 AND 5),
    comment TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, book_id),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (book_id) REFERENCES books(id) ON DELETE CASCADE
     )`

    db.query(sql, (err, _) => {
        if (err) {
            console.error("Error creating reviews table:", err);
        } else {
            console.log("✅ reviews table is ready.");
        }
    });
};

module.exports = reviews