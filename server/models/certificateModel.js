const mongoose = require("mongoose")

const Schema = mongoose.Schema

const certificateSchema = new Schema({
    logo: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    institution: {
        type: String,
        required: true,
        unique: true
    },
    templateURL: {
        type: String,
        required: true
    },
    signatureURL: {
        type: String,
        required: true,
    },
    signerDetails: {
        name: {
            type: String,
            required: true
        },
        designation: {
            type: String,
            required: true
        }
    },
    qr: {
        type: String,
        required: true
    }
}, {timestamps: true})

module.exports = mongoose.model("Certificate", certificateSchema)