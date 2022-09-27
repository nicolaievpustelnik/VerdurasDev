const { Schema } = require('mongoose');

const productSchema = new Schema({
    idProd: {
        type: Number,
        require: true
    },
    barCode: {
        type: Number,
        require: true
    },
    nomCat: {
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
    idSuc: {
        type: String,
        require: true
    },
    salePrice: {
        type: Number,
        require: true
    }
}, {
    timestamps: true
})

module.exports = productSchema;