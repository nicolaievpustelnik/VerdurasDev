const { model } = require('mongoose');
const productSchema = require('./ProductSchema');

class Product {

    constructor(barCode, nomCat, idSuc, idSupplier, marca, description, stock, salePrice, purchasePrice) {
        this.barCode = barCode;
        this.nomCat = nomCat;
        this.idSuc = idSuc;
        this.idSupplier = idSupplier;
        this.marca = marca;
        this.description = description;
        this.stock = stock;
        this.salePrice = salePrice;
        this.purchasePrice = purchasePrice

    }

    getAll() {
        return `Product[barCode:${this.barCode}, nomCat:${this.nomCat}, idSuc:${this.idSuc}, idSupplier:${this.idSupplier}, marca:${this.marca}, description:${this.description}, stock:${this.stock}, salePrice:${this.salePrice}, purchasePrice:${this.purchasePrice}]`;
    }

}

productSchema.loadClass(Product);
module.exports = model('Product', productSchema);