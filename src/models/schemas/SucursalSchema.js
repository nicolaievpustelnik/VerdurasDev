const { Schema } = require('mongoose');

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
        require: false
    },
    products: {
        type: [],
        require: false
    }

}, {
    timestamps: true
})


module.exports = sucursalSchema;