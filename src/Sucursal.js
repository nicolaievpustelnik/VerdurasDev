const { model } = require('mongoose');

const sucursalSchema = require("./models/schemas/SucursalSchema");
const ProductoSucursal = require('./models/ProductoSucursal');
const Empleado = require('./models/Empleado');
const Rol = require('./models/Rol');

class Sucursal {

    constructor(idSucursal, nombreSucursal, ubicacion) {
        this.idSucursal = idSucursal;
        this.nombreSucursal = nombreSucursal;
        this.ubicacion = ubicacion;
        this.usuarios = [];
        this.productos = [];
    }
    getUbicacion(){
        return this.ubicacion
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

    validarRol(rol) {

        let existeRoles = false;

        for (let i = 0; i < rol.length; i++) {

            let rolNombre = rol[i].name;

            switch (rolNombre) {
                case Rol.CAJERO.name:
                    existeRoles = true;
                    break;

                case Rol.ORGANIZADOR.name:
                    existeRoles = true;
                    break;

                case Rol.REPOSITOR.name:
                    existeRoles = true;
                    break;

                default:
                    break;
            }
        }

        return existeRoles
    }
    
}
sucursalSchema.loadClass(Sucursal);
module.exports = model('Sucursal', sucursalSchema);
