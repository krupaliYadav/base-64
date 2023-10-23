const mongoose = require("mongoose");

const connectDatabase = async () => {
    await mongoose.connect('mongodb://127.0.0.1:27017/DB_BASE64', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(() => {
        console.log("Backend is Connected")
    }).catch((Error) => {
        console.log("Error =>", Error);
    })
};

module.exports = connectDatabase;