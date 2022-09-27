const { model } = require('mongoose');

const Product = require("./Product");
const Usuario = require("./User");

const sucursalSchema = require("./schemas/SucursalSchema");
const ProductSucursal = require('./ProductSucursal');

class Sucursal {

    constructor(idSuc, nomSuc, ubicacion) {
        this.idSuc = idSuc;
        this.nomSuc = nomSuc;
        this.ubicacion = ubicacion;
        this.users = [];
        this.products = [];
    }

    addProduct(productAux) {
        let p = new ProductSucursal(productAux)
        this.products.push(p)
    }

    getAll() {
        return `Sucursal[idSuc:${this.idSuc}, nomSuc:${this.nomSuc}, ubicacion:${this.ubicacion}, users:${this.users}, products:${this.products}]`;
    }
    listOfProducts() {
        return this.products
    }
    listOfUsuarios() {
        return this.users
    }
    /*   addProduct(){
          return new Product(1234567888888, 'Verduras', '2', '5', 'Tama', 'Papa', 120, 15000, 10000)
      } */
    saludar() {
        return `Hola Mundo`
    }
}

sucursalSchema.loadClass(Sucursal);
module.exports = model('Sucursal', sucursalSchema);
