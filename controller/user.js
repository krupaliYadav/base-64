const path = require("path")
const bcrypt = require("bcrypt")
const { fileUpload } = require("../helper.js/fileUpload")
const User = require("../models/user")
const { readFileSync } = require("fs")

const covertImageToBase64 = async (req, res) => {
    const { fileName } = req.body
    const imagePath = path.resolve(__dirname, "../" + `/public/${fileName}`);
    const image = readFileSync(imagePath);

    // Convert the image to a Base64 string
    const base64String = Buffer.from(image).toString('base64');
    res.status(200).json({ status: 200, success: true, message: 'Convert image to base64 successfully.', base64String })
}

const covertBase64ToImage = async (req, res) => {
    let { name, email, password, image } = req.body
    const user = await User.findOne({ email: email, isDeleted: 0 })
    if (user) {
        throw new ConflictRequestException("An account already exists with this email address.")
    }
    password = bcrypt.hashSync(password, 10)

    const result = await fileUpload(image, ["jpeg", "png", "jpg"])
    if (result.success === false) {
        return res.status(400).json({ status: 400, success: false, message: result.message })
    }

    await User.create({ name, email, password, password, image: result })
    res.status(200).json({ status: 200, success: true, message: 'Convert image to base64 successfully.' })
}

module.exports = {
    covertImageToBase64,
    covertBase64ToImage
}