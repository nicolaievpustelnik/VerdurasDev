const { Schema } = require('mongoose');

const movimientoSchema = new Schema({

    idMovimiento: {
        type: Number,
        require: true
    },
    ticket: {
        type: {},
        require: true
    },
    cliente: {
        type: {},
        require: false
    },
    proveedor: {
        type: {},
        require: false
    },
    monto: {
        type: Number,
        require: true
    },
    fecha: {
        type: String,
        require: true
    },

},
    {
        timestamps: true
    })

module.exports = movimientoSchema;