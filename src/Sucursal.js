const { model } = require('mongoose');

sucursalSchema = require("./models/schemas/SucursalSchema");
const rolEnum = require('./models/Rol');
const Empleado = require('./models/Empleado');
const Cliente = require('./models/Cliente');
const Movimiento = require('./models/Movimiento');
const Notificacion = require('./models/Notificacion');
const ErrorDeIncidencia = require('./models/ErrorDeIncidencia');

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

    recepcionarProducto(idProveedor, codigoBarra, cant) {
        let seRecepciono = false;
        try {
            var unEmpleado = this.obtenerUsuarioLogueado();
            if (unEmpleado) {
                if (verificarRol(unEmpleado, rolEnum.RECEPCIONISTA)) {
                    let unProveedor = this.obtenerProveedor(idProveedor)
                    if (unProveedor) {
                        let unProductoSucursal = this.buscarUnProductoEnSucursal(scanner);
                        if (unProductoSucursal) {
                            if (this.validarIngreso(cant)) {
                                unProductoSucursal.actualizarStock(cant)
                                seRecepciono = true;
                                this.generarMovimiento(cant, unProductoSucursal, unProveedor);
                            }
                        }e
                    }
                }
            }
        } catch (err) {
            this.dispararAlerta(unEmpleado, err);
        }
        return seRecepciono;
    }

    verificarRol(unEmpleado, unRol) {
        let verificado = false
        if (!(unEmpleado.getRol() === unRol)) {
            throw new Error('Intenta ejecutar una tarea no autorizada')
        }
        verificado = true;
        return verificado;
    }

    dispararAlerta(unEmpleado, err) {
        console.log('------------------------->Error recibido '+err)
        if (err instanceof ErrorDeIncidencia) {
           
            console.log(`Empleado  ${unEmpleado.getNombreCompleto()}, '--> ' ${err.message}`);
            let unaNotificacion = new Notificacion({ nombreCompletoEmpleado: unEmpleado.getNombreCompleto(), mensaje: err.message, fecha: new Date().toLocaleString() });
            this.incidentesSospechosos.push(unaNotificacion);
        } else {
            console.log('Otro tipo de error')
        }
    }

    egresarProducto(dni, scanner, cant) {
        let seEgreso = false;
        try {
            var unEmpleado = this.obtenerUsuarioLogueado();
            if (unEmpleado) {
                if (verificarRol(unEmpleado, rolEnum.CAJERO)) {
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

    obtenerProveedor(idProveedor) {
        let unProveedor = this.proveedoresAutorizados.find(p => p.idProveedor === idProveedor);
        if (!unProveedor) throw new ErrorDeIncidencia('Intenta ingresar mercaderia a proveedor no autorizado');
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

    async agregarUsuario(res, user) {

        if (this.buscarEmpleado(user.getLegajo())) {
            throw new Error('El legajo ya se encuentra asignado a otro empleado!');
        } else {
            await user.save();
        }
    }

    async listaDeUsuarios() {
        return await Empleado.find().lean();
    }

    async eliminarUsuario(id) {
        await Empleado.findByIdAndDelete(id);
    }

    async buscarUsuarioPorId(id) {
        return await Empleado.findById(id).lean();
    }

    async editarUsuario(id, params) {
        return await Empleado.findByIdAndUpdate(id, params);
    }

    getAll() {
        return `Sucursal[idSucursal:${this.idSucursal}, nombreSucursal:${this.nombreSucursal}, ubicacion:${this.ubicacion}, usuarios:${this.usuarios}, productos:${this.productos}]`;
    }

    getListaDeProductosEnSucursal() {
        return this.productosDeSucursal
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
            throw new Error('No hay stock suficiente!');
        }
        return pudo;
    }

    obtenerUsuarioLogueado() {
        let unEmpleado = this.buscarEmpleado(654321);

        // Por ahora se setea - pero el metodo tiene que buscar en la base de datos
        let unEmpleadoAux = new Empleado({ nombre: 'Jorge', apellido: 'Castillo', email: 'jindr@admin.com', password: '123456', sucursal: '2', tipoUsuario: 'Empleado', rol: rolEnum.RECEPCIONISTA.name })

        //Metodo para obtener usuario Logueado
        //if (!unAdmin) throw new Error('Empleado no Existe!')
        return unEmpleadoAux;
    }

}
sucursalSchema.loadClass(Sucursal);
module.exports = model('Sucursal', sucursalSchema);
