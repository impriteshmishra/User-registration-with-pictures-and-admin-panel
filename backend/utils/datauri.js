import DataUriParser from "datauri/parser.js";
import path from "path";

const parser = new DataUriParser();

const getDataUri = (file) => {
  const extName = path.extname(file.originalname).toString();
  const mimeType = `image/${extName.substring(1)}`; // Extract mime type from extension
  return parser.format(mimeType, file.buffer).content;
};

export default getDataUri;