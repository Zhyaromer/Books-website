const multer = require("multer");
const path = require("path");
const db = require("../../config/SQL/sqlconfig");
const fs = require("fs");

const uploadDir = path.resolve(__dirname, "../../assets/profilepic");
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: uploadDir,
    filename: (req, file, cb) => {
        const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
        cb(null, uniqueSuffix + path.extname(file.originalname));
    },
});

const upload = multer({
    storage,
    limits: { fileSize: 3 * 1024 * 1024 },
    fileFilter: (req, file, cb) => {
        const allowedTypes = /jpeg|jpg|png|webp|gif/;
        const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = allowedTypes.test(file.mimetype);

        if (extname && mimetype) {
            return cb(null, true);
        } else {
            return cb(new Error("Only image files (JPEG, PNG, GIF,webp) are allowed"));
        }
    },
});

const changepic = async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
    }

    const filename = `http://localhost:3000/assets/profilepic/${req.file.filename}`;

    const userId = req?.user?.id;
    if (!userId) {
        return res.status(401).json({ error: "Unauthorized" });
    }

    try {
        const [userResult] = await db.promise().query("SELECT coverImgURL FROM users WHERE id = ?", [userId]);
        if (userResult.length === 0) {
            return res.status(404).json({ error: "User not found" });
        }

        const oldPic = userResult[0].coverImgURL;
        const oldPicName = `${uploadDir}/${path.basename(oldPic)}`;
        if (oldPicName) {
            if (fs.existsSync(oldPicName)) {
                fs.unlinkSync(oldPicName);
            }
        }

        const [updateProfilePic] = await db
            .promise()
            .query("UPDATE users SET coverImgURL = ? WHERE id = ?", [filename, userId]);

        if (updateProfilePic.affectedRows === 0) {
            return res.status(500).json({ error: "Profile picture update failed" });
        }

        return res.status(200).json({ message: "Profile picture updated successfully", filename: filename });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error" });
    }
};

module.exports = { changepic, upload };