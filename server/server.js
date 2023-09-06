require("dotenv").config()

const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")

const certificateRoutes = require("./routes/certificates")

const app = express()

app.use(express.json())
app.use(cors())

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})
app.use("/api/certificates", certificateRoutes)


mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log("connected and listening to the port", process.env.PORT)
        })
    })
    .catch((error) => {
        console.log(error)
    })