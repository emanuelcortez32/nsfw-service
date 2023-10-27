const multer = require('multer');
const { uploaderFile } = require("../service/fileService");
const { LIMIT_FILE_SIZE, LIMIT_UNEXPECTED_FILE, UNSUPPORTED_MEDIA_TYPE } = require('../constants/multerConstants');

const uploaderFileMiddleware = (req, res, next) =>
    uploaderFile(req, res, (err) => {
        if (err instanceof multer.MulterError) {
            switch (err.code) {
                case LIMIT_FILE_SIZE:
                    return res.status(413).json({ error: err });
                case LIMIT_UNEXPECTED_FILE:
                    err.message = "Unexpected field, expected field 'file'"
                    return res.status(400).json({ error: err });
                case UNSUPPORTED_MEDIA_TYPE:
                    return res.status(400).json({ error: err });
                default:
                    return res.status(500).json({ error: err });
            }
        }
        next(err);
    });

module.exports = {
    uploaderFileMiddleware
}