const { model } = require('mongoose');

const Product = require('./Product');
const productSchema = require('./schemas/ProductSchema');

class ProductProvider extends Product {

    constructor(idProd,barCode, nomCat, marca, descripcion, stock,idProv,purchasePrice) {
        super(idProd,barCode, nomCat, marca, descripcion, stock)
        this.idProv = idProv
        this.purchasePrice = purchasePrice
    }

    getAll() {
        return `ProductProvider[idProd:${this.idProd},barCode:${this.barCode}, nomCat:${this.nomCat}, marca:${this.marca}, description:${this.description}, stock:${this.stock}, idProv:${this.idProv}, purchasePrice:${this.purchasePrice}]`;
    }
}

productSchema.loadClass(ProductProvider);
module.exports = model('ProductProvider', productSchema);