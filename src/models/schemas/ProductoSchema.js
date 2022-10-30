const { Schema } = require('mongoose');

const productoSchema = new Schema({
    idProducto: {
        type: Number,
        require: true
    },
    codigoBarra: {
        type: Number,
        require: true
    },
    nombreCategoria: {
        type: String,
        require: true
    },
    marca: {
        type: String,
        require: true
    },
    descripcion: {
        type: String,
        require: true
    },
    stock: {
        type: Number,
        require: true
    },
    idSucursal: {
        type: Number,
        require: false
    },
    idProveedor: {
        type: Number,
        require: false
    },
    precioVenta: {
        type: Number,
        require: false
    },
    precioCompra: {
        type: Number,
        require: false
    }

}, {
    timestamps: true
})

module.exports = productoSchema;