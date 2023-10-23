const fs = require("fs")
const path = require("path")
const { v4: uuidv4 } = require('uuid');

const fileUpload = async (file, allowedTypes) => {
    try {
        let base64Data = Buffer.from(file, "base64"); // Convert base64 data to a buffer
        extension = 'png'

        if (!allowedTypes.includes(extension)) {
            return { status: 500, success: false, message: `The ${extension} is not allowed.` };
        }
        let fileName = uuidv4() + "." + extension;
        let newPath = path.resolve(__dirname, "../", `public/${fileName}`);
        fs.writeFileSync(newPath, base64Data);

        return fileName
    } catch (error) {
        return { status: 500, success: false, message: error.message }
    }

}

module.exports = {
    fileUpload,

}