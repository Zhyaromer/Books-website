const db = require('../../config/SQL/sqlconfig');
const xss = require('xss');

const addReview = async (req, res) => {
    let { rating, hasSpoiler, comment } = req.body;
    let user_id = req?.user?.id;
    let { book_id } = req.params;

    comment = xss(comment).trim();
    book_id = xss(book_id).trim();
    rating = parseInt(xss(rating).trim(), 10);

    if (!user_id || !book_id) {
        console.log("user_id and book_id are required");
        return res.status(400).json({ error: "user_id and book_id are required" });
    }

    if (!rating || !comment || hasSpoiler == null || hasSpoiler == undefined) {
        console.log("rating and comment are required");
        return res.status(400).json({ error: "rating and comment are required" });
    }

    if (isNaN(rating) || rating < 1 || rating > 5) {
        console.log("Rating must be a number between 1 and 5.");
        return res.status(400).json({ error: "Rating must be a number between 1 and 5." });
    }

    if (comment.trim().length < 1 || comment.trim().length > 5000) {
        return res.status(400).json({ error: "Comment must be between 1 and 5000 characters." });
    }

    try {
        const [existingReview] = await db.promise().query(
            "SELECT * FROM reviews WHERE user_id = ? AND book_id = ?",
            [user_id, book_id]
        );
        if (existingReview.length > 0) {
            return res.status(400).json({ error: "You have already reviewed this book" });
        }

        const [result] = await db.promise().query(
            "INSERT INTO reviews (user_id, book_id, rating, comment,isSpoiler) VALUES (?, ?, ?, ?, ?)",
            [user_id, book_id, rating, comment, hasSpoiler]
        );

        if (result.affectedRows > 0) {
            return res.status(201).json({ message: "Review added successfully" });
        }
        return res.status(500).json({ error: "Error adding review" });
    } catch (error) {
        return res.status(500).json({ error: "Internal server error" });
    }
};

module.exports = addReview 
