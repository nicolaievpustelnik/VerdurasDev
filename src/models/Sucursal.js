const { model } = require('mongoose');

const Producto = require("./Producto");
const Usuario = require("./Usuario");

const sucursalSchema = require("./schemas/SucursalSchema");
const ProductoSucursal = require('./ProductoSucursal');
const Empleado = require('./Empleado');

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
    listaDeProductosEnSucursal() {
        return this.productos
    }
    listaDeUsuarios() {
        return this.usuarios
    }
    saludar() {
        return `Hola Mundo`
    }
}

sucursalSchema.loadClass(Sucursal);
module.exports = model('Sucursal', sucursalSchema);
