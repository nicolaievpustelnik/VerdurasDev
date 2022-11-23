const { model } = require('mongoose');

sucursalSchema = require("./models/schemas/SucursalSchema");
const rolEnum = require('./repository/Rol');
const Empleado = require('./repository/Empleado');
const ProductoSucursal = require('./repository/ProductoSucursal');
const ProductoProveedor = require('./repository/ProductoProveedor');
const Cliente = require('./repository/Cliente');
const Movimiento = require('./repository/Movimiento');
const Notificacion = require('./repository/Notificacion');
const ErrorDeIncidencia = require('./repository/ErrorDeIncidencia');
const Proveedor = require('./repository/Proveedor');

class Sucursal {

    constructor(idSucursal, nombreSucursal, ubicacion) {
        this.idSucursal = idSucursal;
        this.nombreSucursal = nombreSucursal;
        this.ubicacion = ubicacion;
        this.productosDeSucursal = [];
        this.proveedoresAutorizados = [];
        this.compras = [];
        this.ventas = [];
        this.empleadosDeSucursal = [];
        this.incidentesSospechosos = [];
    }
obtenerUsuarioLogueado(){
    return this.empleadosDeSucursal.find(p => p.legajo == 123456);
}
    recepcionarProducto(idProveedor, scanner, cant) {
        let seRecepciono = false;
        try {
            var unEmpleado = this.obtenerUsuarioLogueado();
            if (unEmpleado) {
                if (this.verificarRol(unEmpleado, rolEnum.RECEPCIONISTA)) {
                    let unProveedor = this.obtenerProveedor(idProveedor)
                    if (unProveedor) {
                        let unProductoSucursal = this.buscarProductoPorCodigoBarraSucursal(scanner);
                        if (unProductoSucursal) {
                            if (this.validarIngreso(cant)) {
                                unProductoSucursal.actualizarStock(cant)
                                seRecepciono = true;
                                this.generarMovimiento(cant, unProductoSucursal, unProveedor);
                            }
                        }
                    }
                }
            }
        } catch (err) {
            this.dispararAlerta(unEmpleado, err);
        }
        return seRecepciono;
    }

    verificarRol(unEmpleado, unRol) {
        let verificado = false;
        if (!(unEmpleado.rol[0].name === unRol.name || unEmpleado.rol[0].name === rolEnum.ORGANIZADOR.name)) {
            throw new ErrorDeIncidencia('Intenta ejecutar una tarea no autorizada')
        }
        verificado = true;
        return verificado;
    }

    dispararAlerta(unEmpleado, err) {
        if (err instanceof ErrorDeIncidencia) {
            let unaNotificacion = new Notificacion({ nombreCompletoEmpleado: unEmpleado.getNombreCompleto(), mensaje: err.message, fecha: new Date().toLocaleString() });
            this.incidentesSospechosos.push(unaNotificacion);
        } else {
            console.log('Otro tipo de error: ' + err.name + " --> " + err.message)
        }
    }

    egresarProducto(dni, scanner, cant) {
        let seEgreso = false;
        try {
            var unEmpleado = this.obtenerUsuarioLogueado();
            if (unEmpleado) {
                if (this.verificarRol(unEmpleado, rolEnum.CAJERO)) {
                    let unCliente = new Cliente({ dniCliente: dni, nombreCliente: "Matias" });
                    let unProductoSucursal = this.buscarProductoPorCodigoBarraSucursal(scanner)
                    if (this.hayStock(unProductoSucursal, cant)) {
                        if (this.validarEgreso(cant)) {
                            unProductoSucursal.actualizarStock(-cant)
                            seEgreso = true;
                            this.generarMovimiento(cant, unProductoSucursal, unCliente);
                        }
                    }
                }
            }
        } catch (err) {
            this.dispararAlerta(unEmpleado, err);
        }
        return seEgreso
    }

    generarMovimiento(cant, unProducto, proveedor) {
        let monto = this.calcularMonto(cant, proveedor, unProducto);
        let movimiento = null;
        if (proveedor instanceof Cliente) {
            movimiento = this.generarVenta(cant, unProducto, proveedor, monto);
        } else {
            movimiento = this.generarCompra(cant, unProducto, proveedor, monto);
        }
        return movimiento;
    }

    generarVenta(cant, unProducto, proveedor, monto) {
        let venta = new Movimiento({
            cant: cant,
            descripcionProducto: unProducto.descripcion,
            nombreEnte: proveedor.nombreCliente,
            monto: monto,
            fecha: new Date().toLocaleDateString(),
            tipo: "Venta"
        });
        this.ventas.push(venta)
        return venta
    }

    generarCompra(cant, unProducto, proveedor, monto) {
        let compra = new Movimiento({
            cant: cant,
            descripcionProducto: unProducto.descripcion,
            nombreEnte: proveedor.nombreProveedor,
            monto: monto,
            fecha: new Date().toLocaleDateString(),
            tipo: "Compra"
        });
        this.compras.push(compra);
        return compra
    }

    calcularMonto(cant, prov, unProducto) {
        var unMonto = 0
        if (prov instanceof Cliente) {
            unMonto = cant * unProducto.precioVenta;
        } else {
            unMonto = cant * prov.getPrecioCompra(unProducto.codigoBarra);
        }
        return unMonto
    }

    obtenerProveedor(cuil) {
        let unProveedor = this.proveedoresAutorizados.find(p => p.cuilProveedor === cuil);
        if (!unProveedor) throw new ErrorDeIncidencia('Intenta ingresar mercaderia a proveedor no autorizado');
        return unProveedor;
    }

    obtenerStockProducto(idProducto) {
        return this.ProductoSucursal.find(p => p.idProducto == idProducto).getStock();
    }

    buscarEmpleado(legajo) {
        return this.empleadosDeSucursal.find(u => u.legajo === legajo);
    }

    agregarProducto(unProducto) {
        let sePudo = false;
        let product = this.buscarProductoPorCodigoBarraSucursal(unProducto.codigoBarra);
        if (product) {
            throw new Error('El Producto ya se encuentra agregado!');
        } else {
            this.productosDeSucursal.push(unProducto);
            sePudo = true;
        }

        return sePudo;
    }

    agregarProveedor(unProveedor) {
        this.proveedoresAutorizados.push(unProveedor);
    }

    agregarUsuario(unUsuario) {
        let sePudo = false;
        if (this.buscarEmpleado(unUsuario.getLegajo())) {
            throw new Error('El legajo ya se encuentra asignado a otro empleado!');
        } else {
            this.empleadosDeSucursal.push(unUsuario)
            sePudo = true;
        }
        return sePudo;
    }


    listaDeUsuarios() {
        return this.empleadosDeSucursal;
    }

    listaDeProductosEnSucursal(){
        return this.productosDeSucursal;
    }

    buscarProductoPorCodigoBarraSucursal(cod) {
        let unProducto = this.productosDeSucursal.find(p => p.codigoBarra == cod);
        return unProducto;
    }

    getAll() {
        return `Sucursal[idSucursal:${this.idSucursal}, nombreSucursal:${this.nombreSucursal}, ubicacion:${this.ubicacion}, usuarios:${this.usuarios}, productos:${this.productos}]`;
    }

    validarIngreso(cant) {
        const CANT_MIN = 1;
        const CANT_MAX = 1000;
        let pudo = true;
        if (cant < CANT_MIN || cant > CANT_MAX) {
            throw new ErrorDeIncidencia('Intenta ingresar mercaderia fuera de parametros')
        }
        return pudo;
    }

    validarEgreso(cant) {
        const CANT_MIN = 1;
        const CANT_MAX = 50;
        let pudo = true;
        if (cant < CANT_MIN || cant > CANT_MAX) {
            throw new ErrorDeIncidencia('Intenta egresar mercaderia fuera de parametros')
        }
        return pudo;
    }

    hayStock(unProductoDeSucursal, cant) {
        let pudo = true;
        if (unProductoDeSucursal.stock < cant) {
            throw new ErrorDeIncidencia('Esta generando un negativo!');
        }
        return pudo;
    }

}
sucursalSchema.loadClass(Sucursal);
module.exports = model('Sucursal', sucursalSchema);
