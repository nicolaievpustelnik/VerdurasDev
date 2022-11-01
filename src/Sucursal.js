const { model } = require('mongoose');

const sucursalSchema = require("./models/schemas/SucursalSchema");
const ProductoSucursal = require('./models/ProductoSucursal');
const Empleado = require('./models/Empleado');
const Rol = require('./models/Rol');
const Cliente = require('./models/Cliente');
//const Movimiento = require('./models/Movimiento');
//const Incidente = require('./models/Incidente'); 

class Sucursal {

    constructor(idSucursal, nombreSucursal, ubicacion) {
        this.idSucursal = idSucursal;
        this.nombreSucursal = nombreSucursal;
        this.ubicacion = ubicacion;
        this.productosDeSucursal = [];
        this.proveedoresAutorizados = [];
        this.movimientos = [];
        this.empleadosDeSucursal = [];
        this.incidentesSospechosos = [];
    }
    getUbicacion(){
        return this.ubicacion
    }
    recepcionarProducto(idProveedor, scanner, cant) {
        let seRecepciono = false;
        try {
            var unEmpleado = this.obtenerUsuarioLogueado()
            if (unEmpleado) {
                if (unEmpleado.verificarSiTieneRol('Recepcionista')) {
                    let unProveedor = this.obtenerProveedor(idProveedor)
                    if (unProveedor) {
                        let unProductoSucursal = this.buscarProductoEnSucursal(scanner)
                        if (unProductoSucursal) {
                            if (this.validarIngreso(cant)) {
                                unProductoSucursal.actualizarStock(cant)
                                this.generarMovimiento(cant, unProductoSucursal, unProveedor);
                                seRecepciono = true;
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
        console.log(`Empleado  ${unEmpleado.nombreApellido}, '--> ' ${error}`)
        this.incidentesSospechosos.push(new Incidente(unEmpleado, error));
    }

    getDisponible() {
        this.disponible = true;
    }

    egresarProducto(dni, scanner, cant) {
        try {
            var unEmpleado = this.obtenerUsuarioLogueado()
            if (unEmpleado) {
                if (unEmpleado.verificarSiTieneRol('Cajero')) {
                    let unCliente = new Cliente(dni);
                    let unProductoSucursal = this.buscarProductoEnSucursal(scanner)
                    if (this.hayStock(unProductoSucursal, cant)) {
                        if (this.validarEgreso(cant)) {
                            unProductoSucursal.actualizarStock(-cant)
                            this.generarMovimiento(cant, unProductoSucursal, unCliente);
                        }
                    }

                }
            }
        } catch (err) {
            this.dispararAlerta(unEmpleado, err.message);
        }
    }

    generarMovimiento(cant, unProducto, unEnte) {
        return this.movimientos.push(new Movimiento(this.calcularMonto(cant, unEnte, unProducto)),
            this.generarFechaYhoraActual(), unEnte)
    }

    generarFechaYhoraActual() {
        return new Date().toLocaleString();
    }

    calcularMonto(cant, unEnte, unProducto) {
        let unMonto = 0
        if (unEnte instanceof Cliente) {
            unMonto = cant * unProducto.getPrecio();
        } else {
            unMonto = cant * unEnte.getPrecioCompra(unProducto.getScanner());
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

    asignarRol(legajo, unRol) {
        let unEmpleado = this.buscarEmpleado(legajo)
        unEmpleado.agregarRol(unRol)
    }

    buscarProductoEnSucursal(scanner) {
        return this.productosDeSucursal.find(ps => ps.codigoBarra === scanner);
    }

    agregarProducto(unProducto) {
        let sePudo = false;
        if (this.buscarProductoEnSucursal(unProducto.getScanner())) {
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

    listaDeProductosEnSucursal() {
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
        if (unProductoDeSucursal.getStock() < cant) {
            throw new Error('No hay stock suficiente!')
        }
        return pudo;
    }

    obtenerUsuarioLogueado() {
        let unEmpleado = this.buscarEmpleado(123456);
        //Metodo para obtener usuario Logueado
        if (!unEmpleado) throw new Error('Empleado no Existe!')
        return unEmpleado;
    }
    
}
sucursalSchema.loadClass(Sucursal);
module.exports = model('Sucursal', sucursalSchema);
