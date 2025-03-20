const db = require("../config/SQL/sqlconfig");

const book_series = () => {
    const sql = `
    CREATE TABLE IF NOT EXISTS book_series (
    id INT AUTO_INCREMENT PRIMARY KEY,
    series_title VARCHAR(255) NOT NULL,
    cover_img TEXT,
    state VARCHAR(50) CHECK (state IN ('بەردەوامە', 'تەواوبوە'))
    )`

    db.query(sql, (err, _) => {
        if (err) {
            console.error("Error creating book_series table:", err);
        } else {
            console.log("✅ book_series table is ready.");
        }
    });
}

module.exports = book_series;