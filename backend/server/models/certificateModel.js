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
    issuedAt: {
        type: Number,
        required: true,
    },
    templateURL: {
        type: String,
        required: true
    },
    signatureURL: {
        type: String,
        required: true,
    },
    signer: {
        name: {
            type: String,
            required: true
        },
        designation: {
            type: String,
            required: true
        }
    },
    govtSignature: {
        r: {
            type: String,
            required: true
        },
        s: {
            type: String,
            required: true
        },
        v: {
            type: Number,
            required: true
        }
    }
})

module.exports = mongoose.model("Certificate", certificateSchema)