const mongoose = require('mongoose')

const waresSchema = new mongoose.Schema({
    name: {type: String, required: true, unique: true},
        // a fenti paraméterek: string típusú érték, kötelező megadni, egyedinek kell lennie
    price: {type: Number, required: true},
    description: {type: String, required: true},
    diameter: {type: Number, required: true},
    imgUrl: {type: String, required: true}
},{collection: 'wares'})

module.exports = waresSchema