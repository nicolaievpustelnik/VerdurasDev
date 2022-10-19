const { model } = require('mongoose');

const sucursalSchema = require("./models/schemas/SucursalSchema");
const ProductoSucursal = require('./models/ProductoSucursal');
const Empleado = require('./models/Empleado');

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
}

sucursalSchema.loadClass(Sucursal);
module.exports = model('Sucursal', sucursalSchema);
