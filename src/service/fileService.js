const { MIME_TYPES, UNSUPPORTED_MEDIA_TYPE, FORM_DATA_FILE_FIELD } = require("../constants/multerConstants");
const multer = require("multer")

const fileFilter = (req, file, cb) => {
    if (MIME_TYPES.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(null, false);
        const multerError = new multer.MulterError(UNSUPPORTED_MEDIA_TYPE);
        multerError.message = `Only ${MIME_TYPES} format allowed!`
        return cb(multerError);
    }
}

const uploaderFile = multer({
    storage: multer.memoryStorage(),
    fileFilter: fileFilter
}).single(FORM_DATA_FILE_FIELD);

module.exports = {
    uploaderFile
}