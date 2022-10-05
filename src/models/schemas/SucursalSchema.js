const { Schema } = require('mongoose');

const sucursalSchema = new Schema({

    idSucursal: {
        type: Number,
        require: true
    },
    nombreSucursal: {
        type: String,
        require: true
    },
    ubicacion: {
        type: String,
        require: true,
    },
    usuarios: {
        type: [],
        require: false
    },
    productos: {
        type: [],
        require: false
    }

}, {
    timestamps: true
})


module.exports = sucursalSchema;