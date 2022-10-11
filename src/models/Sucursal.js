const { model } = require('mongoose');

const Empleado = require('./Empleado');
const ProductoSucursal = require('./ProductoSucursal');

const sucursalSchema = require("./schemas/SucursalSchema");

class Sucursal {

    constructor(idSucursal, nombreSucursal, ubicacion) {
        this.idSucursal = idSucursal;
        this.nombreSucursal = nombreSucursal;
        this.ubicacion = ubicacion;
        this.usuarios = [];
        this.productos = [];
    }

    agregarProducto(productAux) {
        let p = new ProductoSucursal(productAux)
        this.productos.push(p)
    }

    agregarUsuario(userAux) {
        let e = new Empleado(userAux)
        this.usuarios.push(e)
    }

    getAll() {
        return `Sucursal[idSucursal:${this.idSucursal}, nombreSucursal:${this.nombreSucursal}, ubicacion:${this.ubicacion}, usuarios:${this.usuarios}, productos:${this.productos}]`;
    }

    getProductos() {
        return this.productos
    }
    saludar() {
        return `Hola Mundo`


    getUsuarios() {
        return this.usuarios

    }
}

sucursalSchema.loadClass(Sucursal);
module.exports = model('Sucursal', sucursalSchema);
