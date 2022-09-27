const { model } = require('mongoose');

const Product = require("./Product");
const Usuario = require("./User");

const sucursalSchema = require("./schemas/SucursalSchema");

class Sucursal {

    constructor(idSuc, nomSuc, ubicacion) {
        this.idSuc = idSuc;
        this.nomSuc = nomSuc;
        this.ubicacion = ubicacion;
        this.users = [];
        this.products = [];
    }

    setProduct(productAux) {
        let p = new Product(productAux)
        this.products.push(p)
    }

}

sucursalSchema.loadClass(Sucursal);
module.exports = model('Sucursal', sucursalSchema);
