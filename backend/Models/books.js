const db = require("../config/sql/sqlConfig");

const books = () => {
    const sql = `
    CREATE TABLE IF NOT EXISTS books (
         id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    author_id INT,
    series_id INT,
    genre VARCHAR(100),
    part_num INT,
    language VARCHAR(50) CHECK (language IN ('Kurdish', 'English')),
    description TEXT,
    published_date DATE,
    rating INT DEFAULT 1,
    cover_image TEXT,
    page_count INT CHECK (page_count > 0),
    views INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (author_id) REFERENCES authors(id) ON DELETE CASCADE,
    FOREIGN KEY (series_id) REFERENCES book_series(id) ON DELETE CASCADE
    )`

    db.query(sql, (err, _) => {
        if (err) {
            console.error("Error creating books table:", err);
        } else {
            console.log("✅ books table is ready.");
        }
    })
}

module.exports = books;