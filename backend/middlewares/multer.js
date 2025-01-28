import multer from "multer";
const upload = multer({
    storage:multer.memoryStorage(),
}).array('images',5);
export default upload;