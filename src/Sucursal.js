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

    recepcionarProducto(idProveedor, idProducto, cant) {

        let unEmpleado = this.obtenerUsuarioLogueado();

        if (unEmpleado != null) {

            for (let i = 0; i < unEmpleado.getRoles().length; i++) {

                let rol = unEmpleado.getRoles()[i].name

                if (rol == Rol.RECEPCIONISTA.name || rol == Rol.ORGANIZADOR.name) {


                    if (this.obtenerProveedor(idProveedor)) {

                        if (this.buscarProductoEnSucursal(idProducto)) {

                            if (this.cantidadEsValida(cant)) {
                                unProductoSucursal.actualizarStock(cant)
                                this.movimientos.push(new Movimiento(this.calcularMonto(cant, this.obtenerPrecioCompra(idProd)),
                                    this.generarIdMovimiento(), this.generarFechaYhoraActual(), idProveedor))
                            } else {
                                this.dispararAlerta(unEmpleado, "Intento de ingresar cantidad fuera de parametros")
                            }

                        } else {
                            console.log("Producto no esta en surtido, agregue producto antes de recepcionar!")
                        }

                    } else {
                        console.log("Proveedor no autorizado para entrega")
                        this.dispararAlerta(unEmpleado, "Intenta dar ingreso de mercaderia no autorizada")
                    }

                    break
                } else {
                    console.log("No cumple con el rol correspondiente!")
                    this.dispararAlerta(unEmpleado, "Intenta ejecutar una tarea no autorizada")
                }

            }

        } else {
            console.log("Empleado no Existe!")
        }
    }

    obtenerStockProducto(idProducto) {
        return 0;
    }

    obtenerUsuarioLogueado() {
        return null;
    }

    buscarProductoEnSucursal(idProdSuc) {
        return productosSucursal.find(ps => ps.idProducto == idProdSuc);
    }

    buscarEmpleado(idEmpleado) {
        return this.empleados.find(u => u.idEmpleado == idEmpleado);
    }

    agregarProducto(productAux) {
        let p = new ProductoSucursal(productAux)
        this.productos.push(p)
    }

    agregarUsuario(user) {

        let auxUser = null;

        if (user instanceof Empleado) {
            auxUser = new Empleado(user);

        } else if (user instanceof Admin) {
            auxUser = new Admin(user);
        }

        if (this.usuarios.push(auxUser) && auxUser != null) {
            return true;
        }

        return false;
    }

    recibirProductoStock(producto) {
        return true;
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
