const db = require("../config/sql/sqlConfig");

const quotes = () => {
    const sql = `
    CREATE TABLE IF NOT EXISTS quotes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    book_id INT,
    author_id INT,
    quote TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (book_id) REFERENCES books(id) ON DELETE CASCADE,
    FOREIGN KEY (author_id) REFERENCES authors(id) ON DELETE CASCADE
    )`

    db.query(sql, (err, _) => {
        if (err) {
            console.error("Error creating quotes table:", err);
        } else {
            console.log("✅ quotes table is ready.");
        }
    });
}

module.exports = quotes