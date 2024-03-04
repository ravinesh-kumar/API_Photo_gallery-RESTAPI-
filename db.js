const mongoose = require("mongoose")

async function getConnect() {

    await mongoose.connect("mongodb://127.0.0.1:27017/imageDatabase")
    console.log("database connected");


}
getConnect()