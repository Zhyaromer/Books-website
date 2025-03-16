const multer = require("multer");
const path = require("path");
const fs = require("fs");

/**
 * Creates a multer upload middleware configured for a specific upload type
 * 
 * @param {string} folderName - The subfolder name to store files in (e.g., 'profilepic', 'book_cover')
 * @param {object} options - Configuration options
 * @param {number} options.fileSize - Maximum file size in bytes (default: 3MB)
 * @param {RegExp|string} options.allowedTypes - Regex or string of allowed file types
 * @returns {object} Configured multer middleware
 */

const createUploader = (folderName, options = {}) => {
    const config = {
        fileSize: options.fileSize || 3 * 1024 * 1024,
        allowedTypes: options.allowedTypes || /jpeg|jpg|png|webp|gif/
    };
    
    const uploadDir = path.resolve(__dirname, "../assets", folderName);
    if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
    }
    
    const storage = multer.diskStorage({
        destination: uploadDir,
        filename: (_, file, cb) => {
            const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
            cb(null, uniqueSuffix + path.extname(file.originalname));
        },
    });
    
    return {
        upload: multer({
            storage,
            limits: { fileSize: config.fileSize },
            fileFilter: (_, file, cb) => {
                const allowedTypes = config.allowedTypes;
                const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
                const mimetype = allowedTypes.test(file.mimetype);
                
                if (extname && mimetype) {
                    return cb(null, true);
                } else {
                    return cb(new Error(`Only allowed file types (${allowedTypes}) are accepted`));
                }
            },
        }),
        uploadDir,
        getFilePath: (filename) => `http://localhost:3000/assets/${folderName}/${filename}`
    };
};

module.exports = createUploader;