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
        this.movimientos = [];
        this.empleadosDeSucursal = [];
        this.incidentesSospechosos = [];
    }

    getUbicacion() {
        return this.ubicacion
    }

    recepcionarProducto(idProveedor, scanner, cant) {
        let seRecepciono = false;
        try {
            var unEmpleado = this.obtenerUsuarioLogueado();
            if (unEmpleado) {
                if (unEmpleado.verificarSiTieneRol(rolEnum.RECEPCIONISTA.name)) {
                    let unProveedor = this.obtenerProveedor(idProveedor)
                    if (unProveedor) {
                        let unProductoSucursal = this.buscarUnProductoEnSucursal(scanner)
                        if (unProductoSucursal) {
                            if (this.validarIngreso(cant)) {
                                unProductoSucursal.actualizarStock(cant)
                                seRecepciono = true;
                                //Pendiente a resolver, no guarda Movimiento
                                //this.generarMovimiento(cant, unProductoSucursal, unProveedor); 
                            }
                        }
                    }
                }
            }
        } catch (err) {

            //no Guarda la alerta,
            this.dispararAlerta(unEmpleado.getNombreCompleto(), err.message);
        }
        return seRecepciono;
    }

    dispararAlerta(nombreCompletoEmpleado, error) {
        console.log(`Empleado  ${nombreCompletoEmpleado}, '--> ' ${error}`)
        this.incidentesSospechosos.push(new Notificacion(nombreCompletoEmpleado, error));
    }

    getDisponible() {
        this.disponible = true;
    }

    egresarProducto(dni, scanner, cant) {
        let seEgreso = false;
        try {
            var unEmpleado = this.obtenerUsuarioLogueado();
            if (unEmpleado) {
                if (unEmpleado.verificarSiTieneRol(rolEnum.CAJERO.name)) {
                    //let unCliente = new Cliente(dni); --->No puede crear cliente
                    let unProductoSucursal = this.buscarUnProductoEnSucursal(scanner)
                    if (this.hayStock(unProductoSucursal, cant)) {
                        if (this.validarEgreso(cant)) {
                            unProductoSucursal.actualizarStock(-cant)
                            seEgreso = true;
                            //this.generarMovimiento(cant, unProductoSucursal, unCliente);
                        }
                    }
                }
            }
        } catch (err) {
            console.log('llego fin')
            //this.dispararAlerta(unEmpleado, err.message);
        }
        return seEgreso
    }

    generarMovimiento(cant, unProducto, unEnte) {
        let monto = this.calcularMonto(cant, unEnte, unProducto);
        let unMovimiento = new Movimiento(cant, unProducto.descripcion, unEnte.nombreProveedor, monto);
        this.movimientos.push(unMovimiento);
    }

    calcularMonto(cant, unEnte, unProducto) {
        var unMonto = 0
        if (unEnte instanceof Cliente) {
            unMonto = cant * unProducto.getPrecio();
        } else {

            unMonto = cant * unEnte.getPrecioCompra(unProducto.codigoBarra);
            console.log(unMonto)
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
            throw new Error('No hay stock suficiente!')
        }
        return pudo;
    }

    obtenerUsuarioLogueado() {
        let unEmpleado = this.buscarEmpleado(654321);

        //let unAdmin = new Admin({nombre: 'Jorge', apellido: 'Castillo', email: 'jindr@admin.com', password: '123456', sucursal: '2', tipoUsuario: 'admin' })
        //Metodo para obtener usuario Logueado
        //if (!unAdmin) throw new Error('Empleado no Existe!')
        return unEmpleado;
    }

}
sucursalSchema.loadClass(Sucursal);
module.exports = model('Sucursal', sucursalSchema);
