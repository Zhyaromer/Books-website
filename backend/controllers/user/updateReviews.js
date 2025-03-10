const db = require('../../config/SQL/sqlconfig');

const updateReview = async (req, res) => {
    const { review_id } = req?.query;
    const user_id = req?.user?.id;

    if (!user_id || !review_id) {
        return res.status(400).json({ error: "user_id and review_id are required" });
    }

    try {
        const sql = `select user_id from reviews where id = ?`
        const [result] = await db.promise().query(sql, [review_id]);

        if (result.length === 0) {
            return res.status(404).json({ error: "Review not found" });
        }

        const review_owner_id = result[0].user_id;

        if (parseInt(user_id) !== parseInt(review_owner_id)) {
            return res.status(401).json({ error: "Unauthorized" });
        } else {
            const { rating, comment, hasSpoiler } = req.body;
            console.log(req.body);

            if (!rating || !comment || hasSpoiler == null || hasSpoiler == undefined) {
                return res.status(400).json({ error: "rating and comment are required" });
            }

            if (isNaN(rating) || rating < 1 || rating > 5) {
                return res.status(400).json({ error: "Rating must be a number between 1 and 5." });
            }

            if (comment.trim().length < 5 || comment.trim().length > 3000) {
                return res.status(400).json({ error: "Comment must be between 5 and 3000 characters." });
            }

           const sql2 = `update reviews set rating = ?, comment = ?, isSpoiler = ? where id = ? and user_id = ?`
           const [result2] = await db.promise().query(sql2, [rating, comment, hasSpoiler, review_id, user_id]);

           if (result2.affectedRows > 0) {
            return res.status(200).json({ message: "Review updated successfully", success: true });
           }

           return res.status(200).json({ message: "No changes made to review" });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error" });
    }
}

module.exports = updateReview;