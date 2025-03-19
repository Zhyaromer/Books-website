const createUploader = require("../../Middleware/uplode"); 
const db = require('../../config/SQL/sqlconfig');
const path = require("path");
const fs = require("fs");

const { upload, getFilePath , uploadDir } = createUploader("profilepic");

const changepic = async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
    }
    const filename = getFilePath(req.file.filename);

    const userId = req?.user?.id;
    if (!userId) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    try {
        const [userResult] = await db.promise().query("SELECT coverImgURL FROM users WHERE id = ?", [userId]);
        if (userResult.length === 0) {
            return res.status(404).json({ message: "User not found" });
        }

        const oldPic = userResult[0].coverImgURL;
        if (oldPic) {
            const oldFilename = path.basename(oldPic);
            const oldFilePath = path.join(uploadDir, oldFilename);
            
            if (fs.existsSync(oldFilePath)) {
                fs.unlinkSync(oldFilePath);
            }
        }

        const [updateProfilePic] = await db
            .promise()
            .query("UPDATE users SET coverImgURL = ? WHERE id = ?", [filename, userId]);

        if (updateProfilePic.affectedRows === 0) {
            return res.status(500).json({ message: "Profile picture update failed" });
        }

        return res.status(200).json({ message: "Profile picture updated successfully", filename: filename });
    } catch {
        return res.status(500).json({ message: "Internal server error" });
    }
};

const uploadMiddleware = upload.single("filename");


module.exports = { changepic, upload : uploadMiddleware };