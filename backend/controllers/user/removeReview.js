const db = require('../../config/SQL/sqlconfig');

const removeReview = async (req, res) => {
    const review_id = req.params.review_id;
    const user_id = req?.user?.id;

    if (!user_id) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    if (!review_id) {
        return res.status(400).json({ message: "Review ID is required" });
    }

    try {
        const [existingReview] = await db.promise().query(
            "SELECT id FROM reviews WHERE id = ? AND user_id = ?", 
            [review_id, user_id]
        );

        if (existingReview.length === 0) {
            return res.status(404).json({ message: "Review not found or unauthorized" });
        }

        const [result] = await db.promise().query("DELETE FROM reviews WHERE id = ?", [review_id]);

        if (result.affectedRows > 0) {
            return res.status(200).json({ message: "Review deleted successfully" });
        } else {
            return res.status(500).json({ message: "Failed to delete review" });
        }
        
    } catch  {
        return res.status(500).json({ message: "Internal server error" });
    }
}

module.exports = removeReview;