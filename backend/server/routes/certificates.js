const express = require("express")

const { signCertificate, verifyCertificate } = require('../controllers/certificateController')

const router = express.Router()

router.post("/sign", signCertificate)
router.post("/verify", verifyCertificate)



module.exports = router