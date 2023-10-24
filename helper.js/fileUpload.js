const fs = require("fs")
const path = require("path")
const { v4: uuidv4 } = require('uuid');

const fileUpload = async (file, allowedTypes) => {
    try {
        const data = file.split(';base64,');
        let extension = data[0].split('/')[1]
        let base64Data = data[1]

        if (!allowedTypes.includes(extension)) {
            return { status: 500, success: false, message: `The ${extension} is not allowed.` };
        }

        let bufferData = Buffer.from(base64Data, "base64");
        let fileName = uuidv4() + "." + extension;
        let newPath = path.resolve(__dirname, "../", `public/${fileName}`);
        fs.writeFileSync(newPath, bufferData, 'binary');

        return fileName
    } catch (error) {
        return { status: 500, success: false, message: error.message }
    }

}

module.exports = {
    fileUpload,

}