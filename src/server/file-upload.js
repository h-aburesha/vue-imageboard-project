const multer = require("multer");
const path = require("path");
const uidSafe = require("uid-safe");

const diskStorage = multer.diskStorage({
    destination: (req, file, callback) => {
        // second argument in callback() says WHERE file should be saved
        callback(null, path.join(__dirname, "..", "uploads"));
    },
    filename: (req, file, callback) => {
        uidSafe(24).then((uid) => {
            // second argument in callback() specifies the file name
            callback(null, uid + path.extname(file.originalname));
        });
    },
});

const uploader = multer({
    storage: diskStorage,
    limits: {
        fileSize: 2097152, // file should not exceed 2 MB
    },
});

module.exports = { uploader };
