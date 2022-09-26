const { Schema } = require('mongoose');

const User = require('../User');

const sucursalSchema = new Schema({

    idSuc: {
        type: Number,
        require: true
    },
    nomSuc: {
        type: String,
        require: true
    },
    ubicacion: {
        type: String,
        require: true,
    },
    users: {
        type: [],
        require: true
    },
    products: {
        type: [],
        require: true
    }

}, {
    timestamps: true
})


module.exports = sucursalSchema;