const db = require("../../../config/SQL/sqlconfig");
const fs = require("fs");
const path = require("path");
const createUploader = require("../../../Middleware/uplode");
const { upload, getFilePath, uploadDir } = createUploader("author_cover", {
    fileSize: 5 * 1024 * 1024,
    allowedTypes: /jpeg|jpg|png|webp/
});

const updateAuthor = async (req, res) => {
    const { id } = req.params;
    const authorId = parseInt(id, 10);
    if (isNaN(authorId)) {
        return res.status(400).json({ error: "Valid author ID is required" });
    }

    const filename = req.file ? getFilePath(req.file.filename) : null;
    const { name, bio, language, dateOfBirth, country } = req.body;
    if (!name || !bio || !language || !dateOfBirth || !country) {
        return res.status(400).json({ message: "Missing required fields" });
    }

    const promiseDb = db.promise();
    
    try {
        await promiseDb.beginTransaction();
        
        let updatedFields = `name = ?, bio = ?, language = ?, dateOfBirth = ?, country = ?`;
        let values = [name, bio, language, new Date(dateOfBirth).toISOString().split("T")[0], country];
        let oldCoverPath = null;
        
        if (filename) {
            const [userResult] = await promiseDb.query("SELECT imgURL FROM authors WHERE id = ?", [authorId]);
            if (userResult.length === 0) {
                return res.status(404).json({ error: "Author not found" });
            }
            oldCoverPath = userResult[0].imgURL ? path.join(uploadDir, path.basename(userResult[0].imgURL)) : null;
            updatedFields += `, imgURL = ?`;
            values.push(filename);
        }
        
        values.push(authorId);
        
        const [result] = await promiseDb.query(`UPDATE authors SET ${updatedFields} WHERE id = ?`, values);
        
        if (result.affectedRows === 0) {
            await promiseDb.rollback();
            return res.status(404).json({ error: "Author not found" });
        }
        
        await promiseDb.commit();
        
        if (oldCoverPath && fs.existsSync(oldCoverPath)) {
            fs.unlinkSync(oldCoverPath);
        }
        
        return res.status(200).json({ message: "Author updated successfully" });
    } catch (error) {
        await promiseDb.rollback();
        console.error(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

const uploadAuthorCover = upload.single("author_cover");

module.exports = { updateAuthor, upload: uploadAuthorCover };