const { model } = require('mongoose');

const sucursalSchema = require("./models/schemas/SucursalSchema");
const rolEnum = require('./models/Rol');
const Cliente = require('./models/Cliente');
const Movimiento = require('./models/Movimiento');
const Notificacion = require('./models/Notificacion');

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

    obtenerUsuarioLogueado() {
        let unEmpleado = this.buscarEmpleado(123456);
        if (!unEmpleado) {
            throw new Error('No inicio Sesion!');
        }
        return unEmpleado;
    }

    recepcionarProducto(idProveedor, scanner, cant) {
        let seRecepciono = false;
        try {
            var unEmpleado = this.obtenerUsuarioLogueado();
            if (unEmpleado) {
                if (unEmpleado.verificarSiTieneRol(rolEnum.ORGANIZADOR.name)) {
                    let unProveedor = this.obtenerProveedor(idProveedor)
                    if (unProveedor) {
                        let unProductoSucursal = this.buscarUnProductoEnSucursal(scanner)
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
            this.dispararAlerta(unEmpleado, err.message);
        }
        return seRecepciono;
    }

    dispararAlerta(unEmpleado, error) {
        if (!unEmpleado) {
            console.log('Usuario sin iniciar sesión')
        } else {
            console.log(`Empleado  ${unEmpleado.getNombreCompleto()}, '--> ' ${error}`);
            let unaNotificacion = new Notificacion({ nombreCompletoEmpleado: unEmpleado.getNombreCompleto(), mensaje: error, fecha: new Date().toLocaleString() });
            this.incidentesSospechosos.push(unaNotificacion);
        }
    }

    egresarProducto(dni, scanner, cant) {
        let seEgreso = false;
        try {
            var unEmpleado = this.obtenerUsuarioLogueado();
            if (unEmpleado) {
                if (unEmpleado.verificarSiTieneRol(rolEnum.ORGANIZADOR.name)) {
                    let unCliente = new Cliente({ dniCliente: dni, nombreCliente: "Matias" });
                    let unProductoSucursal = this.buscarUnProductoEnSucursal(scanner)
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
            this.dispararAlerta(unEmpleado, err.message);
        }
        return seEgreso
    }

    generarMovimiento(cant, unProducto, unEnte) {
        let movimiento = null;
        let monto = this.calcularMonto(cant, unEnte, unProducto);
        if (unEnte instanceof Cliente) {
            movimiento = this.generarVenta(cant, unProducto, unEnte, monto);

        } else {
            movimiento = this.generarCompra(cant, unProducto, unEnte, monto);
        }
        return movimiento;
    }
    generarVenta(cant, unProducto, unEnte, monto) {
        let venta = new Movimiento({
            cant: cant,
            descripcionProducto: unProducto.descripcion,
            nombreEnte: unEnte.nombreCliente,
            monto: monto,
            fecha: new Date().toLocaleDateString(),
            tipo: "Venta"
        });
        this.ventas.push(venta)
        return venta
    }

    generarCompra(cant, unProducto, unEnte, monto) {
        let compra = new Movimiento({
            cant: cant,
            descripcionProducto: unProducto.descripcion,
            nombreEnte: unEnte.nombreProveedor,
            monto: monto,
            fecha: new Date().toLocaleDateString(),
            tipo: "Compra"
        });
        this.compras.push(compra);
        return compra
    }

    calcularMonto(cant, unEnte, unProducto) {
        var unMonto = 0
        if (unEnte instanceof Cliente) {
            unMonto = cant * unProducto.precioVenta;
        } else {
            unMonto = cant * unEnte.getPrecioCompra(unProducto.codigoBarra);
        }
        return unMonto
    }

    obtenerProveedor(idProveedor) {
        let unProveedor = this.proveedoresAutorizados.find(p => p.idProveedor == idProveedor);
        if (!unProveedor) throw new Error('Intenta ingresar mercaderia a proveedor no autorizado');
        return unProveedor;
    }

    obtenerStockProducto(idProducto) {
        return this.ProductoDeSucursal.find(p => p.idProducto == idProducto).getStock();
    }

    buscarEmpleado(legajo) {
        return this.empleadosDeSucursal.find(u => u.legajo == legajo);
    }

    buscarUnProductoEnSucursal(scanner) {
        return this.productosDeSucursal.find(ps => ps.codigoBarra == scanner);
    }

    agregarProducto(unProducto) {
        let sePudo = false;
        if (this.buscarUnProductoEnSucursal(unProducto.codigoBarra)) {
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

    getAll() {
        return `Sucursal[idSucursal:${this.idSucursal}, nombreSucursal:${this.nombreSucursal}, ubicacion:${this.ubicacion}, usuarios:${this.usuarios}, productos:${this.productos}]`;
    }

    getListaDeProductosEnSucursal() {
        return this.productosDeSucursal
    }

    listaDeUsuarios() {
        return this.empleadosDeSucursal
    }

    validarIngreso(cant) {
        const CANT_MIN = 1;
        const CANT_MAX = 1000;
        let pudo = true;
        if (cant < CANT_MIN || cant > CANT_MAX) {
            throw new Error('Intenta ingresar mercaderia fuera de parametros')
        }
        return pudo;
    }

    validarEgreso(cant) {
        const CANT_MIN = 1;
        const CANT_MAX = 50;
        let pudo = true;
        if (cant < CANT_MIN || cant > CANT_MAX) {
            throw new Error('Intenta egresar mercaderia fuera de parametros')
        }
        return pudo;
    }

    hayStock(unProductoDeSucursal, cant) {
        let pudo = true;
        if (unProductoDeSucursal.stock < cant) {
            throw new Error('No hay stock suficiente!');
        }
        return pudo;
    }
}
sucursalSchema.loadClass(Sucursal);
module.exports = model('Sucursal', sucursalSchema);
