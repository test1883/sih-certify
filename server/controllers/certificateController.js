const Certificate = require("../models/certificateModel")

const ethers = require("ethers")
const { signer } = require("../utils/wallet")
const QRCode = require("qrcode")

const signCertificate = async (req, res, next) => {
    const {logo, name, title, description, institution, templateURL, signatureURL, signerDetails} = req.body;
    const signerFn = await signer()
    const message = `The ${title} has been issued to ${name}, by ${institution} on ${new Date().toLocaleDateString()}`
    signerFn.signMessage(ethers.solidityPackedKeccak256(["string"], [message])).then(signature => {
        const certificate = Certificate.create({logo, name, title, description, institution, templateURL, signatureURL, signerDetails, qr: " "})
        QRCode.toDataURL(JSON.stringify({message: message, signature: signature, c_id: certificate._id}))
            .then(url => {
                Certificate.findOneAndUpdate({_id: certificate._id}, {
                    qr: url
                })
                res.status(200).json({qr: url})
                console.log(url)
            })
            .catch(err => {
                res.status(400).json(err)
                console.error(err)
            })
    }).catch(err => {
        res.status(400).json(err)
        console.log(err)
    })
}

const verifyCertificate = async (req, res, next) => {
    const { message, signature, c_id } = req.body
    if (ethers.verifyMessage(ethers.solidityPackedKeccak256(["string"], [ message ]), signature)) {
        res.status(200).json({c_id, message})
    } else {
        res.status(404).json({msg: "The certificate is not valid"})
    }
}

module.exports = {
    signCertificate, 
    verifyCertificate
}