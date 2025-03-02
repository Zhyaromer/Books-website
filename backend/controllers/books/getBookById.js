const db = require('../../config/SQL/sqlconfig');
const xss = require('xss');

// Get book by ID
const getBookById = (req, res) => {
    const { id } = req.params;
    if (!id) {
        return res.status(400).json({ message: 'Missing book ID' });
    }

    try {
        const sanitizedId = id ? xss(id) : null;

        const sql1 = `
        SELECT books.id, books.title, books.author_id, books.series_id, 
        books.genre, books.part_num, books.language, books.description, 
        books.published_date, books.rating, books.cover_image, 
        books.page_count, books.views, 
        authors.name, authors.bio, authors.imgURL, quotes.quote
        FROM books
        INNER JOIN authors ON books.author_id = authors.id
        LEFT JOIN quotes ON books.id = quotes.book_id
        WHERE books.id = ?
        `;

        const sql2 = `
        select books.id, books.title,books.author_id,books.genre,books.language,books.page_count,books.cover_image,authors.name,authors.imgURL 
        FROM BOOKS inner join authors on books.author_id = authors.id where books.series_id = ?
        AND books.id != ?
        ORDER BY books.part_num
        `;

        const sql3 = `
        select * from book_series where id = ?
        `;

        const sql4 = `
        SELECT 
        books.id,books.language,books.page_count, books.title, books.author_id, 
        books.genre, books.part_num,
        books.cover_image, 
        authors.name, authors.imgURL
        FROM books
        INNER JOIN authors ON books.author_id = authors.id
        WHERE books.id NOT IN (?) AND books.genre = ? AND books.language = ?
        AND books.id >= (SELECT FLOOR(MAX(id) * RAND()) FROM books)
        LIMIT 6
        `;

        const sql5 = `
        SELECT reviews.*, books.title, users.username,users.coverImgURL 
        FROM reviews 
        INNER JOIN books ON books.id = reviews.book_id 
        INNER JOIN users ON users.id = reviews.user_id 
        WHERE reviews.book_id = ?
        `;


        db.query(sql1, [sanitizedId], (err, bookDetails) => {
            if (err) {
                return res.status(500).json({ message: 'Internal Server Error' });
            }

            if (bookDetails.length === 0) {
                return res.status(404).json({ message: 'Book not found' });
            }

            const book = bookDetails[0];

            db.query(sql2, [book?.series_id, sanitizedId], (err, seriesBooks) => {
                if (err) {
                    console.log(err);

                    return res.status(500).json({ message: 'Internal Server Error' });
                }

                const forbidId = seriesBooks.map(book => book.id);
                forbidId.push(sanitizedId);

                db.query(sql3, [book?.series_id], (err, series) => {
                    if (err) {
                        console.log(err);
                        return res.status(500).json({ message: 'Internal Server Error' });
                    }

                    db.query(sql4, [forbidId, book?.genre, book?.language], (err, similarBooks) => {
                        if (err) {
                           
                            return res.status(500).json({ message: 'Internal Server Error' });
                        }

                        db.query(sql5, [sanitizedId], (err, reviews) => {
                            if (err) {
                                console.log(err);
                                return res.status(500).json({ message: 'Internal Server Error' });
                            }

                            return res.status(200).json({ book, series, seriesBooks, similarBooks, reviews });
                        });
                    });
                });

            });
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports = getBookById;
