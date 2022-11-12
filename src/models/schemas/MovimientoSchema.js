const { Schema } = require('mongoose');

const movimientoSchema = new Schema({
    cant: {
        type: Number,
        require: true
    },

    descripcionProducto: {
        type: String,
        require: true
    },

    nombreEnte: {
        type: String,
        require: true
    },

    monto: {
        type: Number,
        require: true
    },

    fecha: {
        type: String,
        require: true
    },

    tipo: {
        type: String,
        require: true
    },

},
    {
        timestamps: true
    })

module.exports = movimientoSchema;