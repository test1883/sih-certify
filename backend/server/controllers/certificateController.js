const ethers = require("ethers")
const Certify = require("../abi/contracts/Certify.sol/Certify.json")
const { signerAndContract } = require("../utils/wallet")


const signCertificate = async (req, res, next) => {
    const {signer, contractSigner} = await signerAndContract()
    console.log(ethers.solidityPackedKeccak256(["string"], ["hello"]))
    signer.signMessage(ethers.solidityPackedKeccak256(["string"], ["hello"])).then(signature => {
        console.log(signature)
        console.log(ethers.verifyMessage(ethers.solidityPackedKeccak256(["string"], ["hello"]),signature))
        const r = signature.slice(0, 66);
        const s = "0x" + signature.slice(66, 130);
        const v = parseInt(signature.slice(130, 132), 16);
        contractSigner.VerifyMessage("0x1c8aff950685c2ed4bc3174f3472287b56d9517b9c948127319a09a7a36deac8", v, r, s).then(e => console.log(e))
        console.log({ r, s, v });
    })
}

const verifyCertificate = async (req, res, next) => {
    const {signer, contractSigner} = await signerAndContract()
    console.log(ethers.verifyMessage(ethers.solidityPackedKeccak256(["string"], ["hello"]),"0x75530973b4877e1305abc5c136239afdbcfb7765b9f233ead23d0859a1f4ccb836716f3d6a353141f6197608778b3d894eb9daf5fd7289769538aaed75d7db621b"))
    contractSigner.VerifyMessage(ethers.solidityPackedKeccak256(["string"], ["hello"]), 27, "0x75530973b4877e1305abc5c136239afdbcfb7765b9f233ead23d0859a1f4ccb8", "0x36716f3d6a353141f6197608778b3d894eb9daf5fd7289769538aaed75d7db62").then(e => console.log(e))
}

module.exports = {
    signCertificate, 
    verifyCertificate
}