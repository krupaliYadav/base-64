const routes = require("express").Router()
const expressAsyncHandler = require("express-async-handler")
const userController = require('../controller/user')

routes
    .post("/convertImageToBase64", expressAsyncHandler(userController.covertImageToBase64))
    .post("/convertBase64ToImage", expressAsyncHandler(userController.covertBase64ToImage))

module.exports = routes