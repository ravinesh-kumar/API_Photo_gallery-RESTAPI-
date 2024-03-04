const express = require("express")
const app = express()
const router = require("./Route/RootRouter")

app.use(express.json())

app.use("/imagegalleryapi", router)

app.set(express.static("./public"))

app.use("/public", express.static("public"))

require("./db")

app.listen(8080, () => {
    console.log("server connected at http://localhost:8080")
})
