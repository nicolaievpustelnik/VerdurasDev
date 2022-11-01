const { model } = require('mongoose');

const Producto = require("./Producto");
const Usuario = require("./Usuario");

const sucursalSchema = require("./schemas/SucursalSchema");
const ProductoSucursal = require('./ProductoSucursal');
const ProductoProveedor = require('./ProductoProveedor');
const Empleado = require('./Empleado');
const Rol = require('./Rol');

class Sucursal {

    constructor(idSucursal, nombreSucursal, ubicacion) {
        this.idSucursal = idSucursal
        this.nombreSucursal = nombreSucursal
        this.ubicacion = ubicacion
        this.productosSucursal = [];
        this.productosProveedor = [];
        this.movimientos = [];
    }

    recepcionarProducto(idProveedor, idProducto, cant) {
        let unEmpleado = this.obtenerUsuarioLogueado()
        if (unEmpleado != null) {
            if (unEmpleado.getRol() == Rol.RECEPCIONISTA || unEmpleado.getRol() == Rol.ORGANIZADOR) {
                let unProveedor = this.obtenerProveedor(idProveedor)
                if (unProveedor != null) {
                    let unProductoSucursal = this.buscarProductoEnSucursal(idProducto)
                    if (unProductoSucursal != null) {
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
            } else {
                console.log("No cumple con el rol correspondiente!")
                this.dispararAlerta(unEmpleado, "Intenta ejecutar una tarea no autorizada")
            }
        } else {
            console.log("Empleado no Existe!")
        }
    }

    obtenerStockProducto(idProducto) {
        return this.ubicacion
    }

    buscarEmpleado(idEmpleado) {
        return this.empleados.find(u => u.idEmpleado == idEmpleado);
    }

    buscarProductoEnSucursal(idProdSuc) {
        return productosSucursal.find(ps => ps.idProducto == idProdSuc);
    }

    agregarProducto(idProducto, codigoBarra, nombreCategoria, marca, descripcion, stock, precioVenta) {
        let p = new ProductoSucursal(idProducto, codigoBarra, nombreCategoria, marca, descripcion, stock, precioVenta)
        this.productos.push(p)
    }

    agregarUsuario(id, nombre, apellido, email, password) {
        let e = new Empleado(id, nombre, apellido, email, password)
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
    obtenerUsuarioLogueado() {
     return new  Empleado({nombre: "Nicolaiev", apellido: "Brito", email: "nicolaievbrito@gmail.com", password: "12345", sucursal: "2", Rol: Rol.RECEPCIONISTA})
    }
}

sucursalSchema.loadClass(Sucursal);
module.exports = model('Sucursal', sucursalSchema);
