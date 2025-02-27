const db = require('../../config/SQL/sqlconfig');

const getReadBooks = async (req, res) => {
    const user_id = req?.user?.id;

    if (!user_id) {
        return res.status(401).json({ error: "Unauthorized" });
    }

    try {
        const [readBooks] = await db.promise().query("SELECT book_id FROM user_reads WHERE user_id = ?", [user_id]);

        if (readBooks.length === 0) {
            return res.status(200).json({ message: "No books found" });
        }

        const booksIds = readBooks.map(book => book.book_id);
        const placeholders = booksIds.map(() => '?').join(', ');

        const [foundBooks] = await db.promise().query(
            `SELECT books.id, books.title, books.author_id, books.genre, books.language, books.page_count, books.cover_image, 
                    authors.name, authors.imgURL 
             FROM books 
             INNER JOIN authors ON books.author_id = authors.id 
             WHERE books.id IN (${placeholders})`, 
             booksIds
        );

        if (foundBooks.length === 0) {
            return res.status(200).json({ message: "No books read" });
        }

        return res.status(200).json(foundBooks);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}

module.exports = getReadBooks;