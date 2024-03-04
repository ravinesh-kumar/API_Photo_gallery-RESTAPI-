const mongoose = require("mongoose")

const GallerySchema = mongoose.Schema({
    pic1: {
        type: String,
        required: [true, "Image 1 is required"]
    },
    pic2: {
        type: String,
        default: ""
    },
    pic3: {
        type: String,
        default: ""
    },
    pic4: {
        type: String,
        default: ""
    },
})

const Gallery = new mongoose.model("Gallery", GallerySchema)
module.exports = Gallery;