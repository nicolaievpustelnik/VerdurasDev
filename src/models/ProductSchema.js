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
        require: true,
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
    },


}, {
    timestamps: true
})

/* productSchema.methods.encryptPassword = async password => {
    const salt = await bcryptjs.genSalt(10);
    return await bcryptjs.hash(password, salt);
};

productSchema.methods.matchPassword = async function (password) {
    return await bcryptjs.compare(password, this.password);
}; */

module.exports = productSchema;