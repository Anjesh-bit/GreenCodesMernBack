const multer = require('multer');
const PATH = process.env.MULTER_PATH;

const storageConfig = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, PATH);
    },
    filename: (req, file, callback) => {
        const fileExt = file.mimetype.split("/")[1];
        callback(null, `image-${Date.now()}.${fileExt}`)
    }
})
const isImageFile = (req, file, callback) => {

    if (file.mimetype.startsWith('image')) {
        callback(null, true)
    }
    else {
        throw (new Error("Only Image is required"))``
    }
}
const multerStorageConfig = multer({
    storage: storageConfig,
    fileFilter: isImageFile,
})
const upload = multerStorageConfig.single('photo');
module.exports = upload;