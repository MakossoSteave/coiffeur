const mongoose = require("mongoose");

const coiffeurSchema = new mongoose.Schema({
    ville: {
        type: String,
        required: true,
        min: 1,
        max: 255
    },
    name: {
        type: String,
        required: true,
        max: 255,
        min: 2
    },
    password: {
        type: String,
        required: true,
        max: 1024,
        min: 6
    },
    SalonName: {
        type: String,
        required: true,
        min: 2,
        max: 255
    },
    Address: {
        type: String,
        required: true,
        max: 1024,
        min: 6
    },
    NbTel: {
        type: String,
        required: true,
        max: 1024,
        min: 6
    },
    NbEmployé: {
        type: Number,
        default: Date.now
    },
    photo: {
        type: String,
        default: null
    },
    description: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("Coiffeur", coiffeurSchema);