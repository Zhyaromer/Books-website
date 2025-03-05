const db = require('../../config/SQL/sqlconfig');
const xss = require('xss');

// Get all books
const getAllBooks = (req, res) => {
    const { genre, language, sorting, page = 1, limit = 12 } = req.query;
    const offset = (page - 1) * limit;

    let countSql = `
        SELECT COUNT(*) as total
        FROM books 
        INNER JOIN authors ON books.author_id = authors.id
    `;

    let sql = `
       SELECT books.id, books.title, books.author_id, books.genre, books.language, 
       books.page_count, books.cover_image, authors.name, authors.imgURL 
       FROM books 
       INNER JOIN authors ON books.author_id = authors.id	
    `;

    let conditions = [];
    let values = [];

    let sanitizedGenres = [];
    if (genre) {
        const genreArray = genre.split(',').map(g => g.trim());
        sanitizedGenres = genreArray.map(g => xss(g));

        if (sanitizedGenres.length > 0) {
            if (sanitizedGenres.length === 1) {
                conditions.push(`books.genre = ?`);
                values.push(sanitizedGenres[0]);
            } else {
                conditions.push(`books.genre IN (${sanitizedGenres.map(() => '?').join(', ')})`);
                values.push(...sanitizedGenres);
            }
        }
    }

    if (language && language !== undefined && language !== 'all' && language.trim() !== '') {
        const sanitizedLanguage = xss(language);
        conditions.push('books.language = ?');
        values.push(sanitizedLanguage);
    }

    if (conditions.length > 0) {
        const whereClause = ' WHERE ' + conditions.join(' AND ');
        sql += whereClause;
        countSql += whereClause;
    }

    switch (sorting) {
        case 'views':
            sql += ' ORDER BY books.views DESC';
            break;
        case 'newest':
            sql += ' ORDER BY books.created_at DESC';
            break;
        case 'most page_count':
            sql += ' ORDER BY books.page_count DESC';
            break;
        case 'lowest page_count':
            sql += ' ORDER BY books.page_count ASC';
            break;
        case 'year':
            sql += ' ORDER BY books.published_date DESC';
            break;
        default:
            sql += ' ORDER BY books.created_at DESC';
    }

    sql += ' LIMIT ? OFFSET ?';
    const paginationValues = [...values, parseInt(limit), parseInt(offset)];

    db.query(countSql, values, (countErr, countResult) => {
        if (countErr) {
            console.error('Count query error:', countErr);
            return res.status(500).json({ message: 'Internal Server Error' });
        }

        const total = countResult[0].total;

        db.query(sql, paginationValues, (err, result) => {
            if (err) {
                console.error('Main query error:', err);
                return res.status(500).json({ message: 'Internal Server Error' });
            }

            if (!result || result.length === 0) {
                return res.status(404).json({ 
                    message: 'No books found',
                    books: [],
                    total: 0,
                    currentPage: parseInt(page),
                    totalPages: 0
                });
            }

            return res.status(200).json({
                books: result,
                total: total,
                currentPage: parseInt(page),
                totalPages: Math.ceil(total / limit)
            });
        });
    });
};

module.exports = getAllBooks;
