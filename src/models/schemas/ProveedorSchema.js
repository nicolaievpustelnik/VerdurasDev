const { Schema } = require('mongoose');

const proveedorSchema = new Schema({

    idProveedor: {
        type: Number,
        require: true
    },
    nombreProveedor: {
        type: String,
        require: true
    },
    productosProveedor: {
        type: [],
        require: true
    },

}, {
    timestamps: true
})

module.exports = proveedorSchema;