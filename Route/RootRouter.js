const galleryRouter = require("./GalleryRouter")

const router = require("express").Router()


router.use("/addimage", galleryRouter)


module.exports = router