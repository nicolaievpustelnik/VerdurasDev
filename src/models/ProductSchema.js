const { Schema } = require('mongoose');

const productSchema = new Schema({

    barCode: {
        type: Number,
        require: true
    },
    nomCat: {
        type: String,
        require: true
    },
    idSuc: {
        type: String,
        require: true
    },
    idSupplier: {
        type: String,
        require: true
    },
    marca: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    stock: {
        type: Number,
        require: true
    },
    salePrice: {
        type: Number,
        require: true
    },
    purchasePrice: {
        type: Number,
        require: true
    }

}, {
    timestamps: true
})

module.exports = productSchema;