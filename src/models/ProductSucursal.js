const { model } = require('mongoose');

const Product = require('./Product');
const productSchema = require('./schemas/ProductSchema');

class ProductSucursal extends Product {

    constructor(idProd, barCode, nomCat, marca, descripcion, stock, idSuc, salePrice) {
        super(idProd, barCode, nomCat, marca, descripcion, stock)
        this.idSuc = idSuc
        this.salePrice = salePrice
    }

    getAll() {
        return `ProductSucursal[idProd:${this.idProd},barCode:${this.barCode}, nomCat:${this.nomCat}, marca:${this.marca}, description:${this.description}, stock:${this.stock}, idSuc:${this.idSuc}, salePrice:${this.salePrice}]`;
    }
}

productSchema.loadClass(ProductSucursal);
module.exports = model('ProductSucursal', productSchema);