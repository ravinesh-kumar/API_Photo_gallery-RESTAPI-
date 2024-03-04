const galleryRouter = require("express").Router()

const multer = require("multer")
const { createRecord, getRecord, getSingleRecord, deleteRecord, updateRecord } = require("../Controllers/GalleryController")

// D:\Desktop\Projects Ducats\nodeJS\Practice\image_upload_on_server\public\upload\galleryimages
const path = require('path');
const storage = multer.diskStorage({
    // destination: function (req, file, cb) {
    //     cb(null, '../public/upload/galleryimages') //path to save
    // },
    destination: function (req, file, cb) {
        const uploadPath = path.join(__dirname, '..', 'public', 'upload', 'galleryimages');
        cb(null, uploadPath);
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname)
    }
})
const upload = multer({ storage: storage })

galleryRouter.post("/", upload.fields([
    { name: "pic1", maxCount: 1 },
    { name: "pic2", maxCount: 1 },
    { name: "pic3", maxCount: 1 },
    { name: "pic4", maxCount: 1 }
]), createRecord)
galleryRouter.get("/", getRecord)
galleryRouter.get("/:_id", getSingleRecord)
galleryRouter.delete("/:_id", deleteRecord)
galleryRouter.put("/:_id", upload.fields([
    { name: "pic1", maxCount: 1 },
    { name: "pic2", maxCount: 1 },
    { name: "pic3", maxCount: 1 },
    { name: "pic4", maxCount: 1 }
]), updateRecord)


module.exports = galleryRouter