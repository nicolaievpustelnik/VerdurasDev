const { model } = require('mongoose');

const Product = require("./Product");
const Usuario = require("./User");

const sucursalSchema = require("./schemas/SucursalSchema");
const ProductSucursal = require('./ProductSucursal');
const Employee = require('./Employee');

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
    addUser(userAux) {
        let e = new Employee(userAux)
        this.users.push(e)
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
    saludar() {
        return `Hola Mundo`
    }
}

sucursalSchema.loadClass(Sucursal);
module.exports = model('Sucursal', sucursalSchema);
