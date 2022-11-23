const { Schema } = require('mongoose');

const proveedorSchema = new Schema({

    cuilProveedor: {
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