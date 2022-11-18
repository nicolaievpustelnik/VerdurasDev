const { model } = require("mongoose");

sucursalSchema = require("./models/schemas/SucursalSchema");
const rolEnum = require("./models/Rol");
const Empleado = require("./models/Empleado");
const ProductoSucursal = require("./models/ProductoSucursal");
const ProductoProveedor = require("./models/ProductoProveedor");
const Cliente = require("./models/Cliente");
const Movimiento = require("./models/Movimiento");
const Notificacion = require("./models/Notificacion");
const ErrorDeIncidencia = require("./models/ErrorDeIncidencia");
const Proveedor = require("./models/Proveedor");

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

  async obtenerUsuarioLogueado() {
    let unEmpleado = await this.buscarEmpleado("11255");
    if (!unEmpleado) {
      throw new Error("No inicio Sesion!");
    }
    return unEmpleado;
  }

  async validarSiEsDeSucursal(res, nombreSucursalRecibido) {
    let usuarioLogueado = await this.obtenerUsuarioLogueado();
    if (!(nombreSucursalRecibido == usuarioLogueado[0].sucursal)) {
      throw new ErrorDeIncidencia("Entrando a sucursal que no corresponde")
    }
  }

  async recepcionarProductoSucursal(idProveedor, scanner, cant) {
    let seRecepciono = false;
    try {
      var unEmpleado = this.obtenerUsuarioLogueado();
      if (unEmpleado) {
        if (this.verificarRol(unEmpleado, rolEnum.RECEPCIONISTA)) {
          let unProveedor = this.obtenerProveedor(idProveedor);
          if (unProveedor) {
            let unProductoSucursal = await this.buscarProductoPorCodigoBarraSucursal(
              scanner
            );
            if (unProductoSucursal[0]) {
              if (this.validarIngreso(cant)) {
                unProductoSucursal.actualizarStock(cant);
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
    if (
      !(
        unEmpleado.rol[0].name === unRol.name ||
        unEmpleado.rol[0].name === rolEnum.ORGANIZADOR.name
      )
    ) {
      throw new ErrorDeIncidencia("Intenta ejecutar una tarea no autorizada");
    }
    verificado = true;
    return verificado;
  }

  async dispararAlerta(res, err) {
   let usuarioLogueado = await this.obtenerUsuarioLogueado();
   console.log("------------------>"+usuarioLogueado[0])
    if (err instanceof ErrorDeIncidencia) {
      console.log("Entro A error de incidencia")
      let unaNotificacion = new Notificacion({
        nombreCompletoEmpleado: usuarioLogueado[0].nombre,
        mensaje: err.message,
        fecha: new Date().toLocaleString(),
      });
      await unaNotificacion.save();
    } else {
      console.log("Otro tipo de error: " + err.name + " --> " + err.message);
    }
  }

  async egresarProducto(dni, scanner, cant) {
    let seEgreso = false;
    try {
      var unEmpleado = this.obtenerUsuarioLogueado();
      if (unEmpleado) {
        if (this.verificarRol(unEmpleado, rolEnum.CAJERO)) {
          let unCliente = new Cliente({
            dniCliente: dni,
            nombreCliente: "Matias",
          });
          let unProductoSucursal = await this.buscarProductoPorCodigoBarraSucursal(
            scanner
          );
          if (this.hayStock(unProductoSucursal[0], cant)) {
            if (this.validarEgreso(cant)) {
              unProductoSucursal.actualizarStock(-cant);
              seEgreso = true;
              this.generarMovimiento(cant, unProductoSucursal, unCliente);
            }
          }
        }
      }
    } catch (err) {
      this.dispararAlerta(unEmpleado, err);
    }
    return seEgreso;
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
      tipo: "Venta",
    });
    this.ventas.push(venta);
    return venta;
  }

  generarCompra(cant, unProducto, proveedor, monto) {
    let compra = new Movimiento({
      cant: cant,
      descripcionProducto: unProducto.descripcion,
      nombreEnte: proveedor.nombreProveedor,
      monto: monto,
      fecha: new Date().toLocaleDateString(),
      tipo: "Compra",
    });
    this.compras.push(compra);
    return compra;
  }

  calcularMonto(cant, prov, unProducto) {
    var unMonto = 0;
    if (prov instanceof Cliente) {
      unMonto = cant * unProducto.precioVenta;
    } else {
      unMonto = cant * prov.getPrecioCompra(unProducto.codigoBarra);
    }
    return unMonto;
  }

  obtenerProveedor(idProveedor) {
    let unProveedor = this.proveedoresAutorizados.find(
      (p) => p.idProveedor === idProveedor
    );
    if (!unProveedor)
      throw new ErrorDeIncidencia(
        "Intenta ingresar mercaderia a proveedor no autorizado"
      );
    return unProveedor;
  }

  obtenerStockProducto(idProducto) {
    return this.ProductoSucursal.find(
      (p) => p.idProducto == idProducto
    ).getStock();
  }

  async buscarEmpleado(legajo) {
    return await Empleado.find({ legajo: legajo });
  }

  async agregarProductoTest(unProducto) {
    let sePudo = false;
    let product = await this.buscarProductoPorCodigoBarraSucursal(
      unProducto.codigoBarra
    );

    if (product[0]) {
      throw new Error("El Producto ya se encuentra agregado!");
    } else {
      this.productosDeSucursal.push(unProducto);
      sePudo = true;
    }

    return sePudo;
  }

  agregarProveedorTest(unProveedor) {
    this.proveedoresAutorizados.push(unProveedor);
  }

  agregarUsuarioTest(unUsuario) {
    let sePudo = false;
    if (this.buscarEmpleado(unUsuario.getLegajo())) {
      throw new Error("El legajo ya se encuentra asignado a otro empleado!");
    } else {
      this.empleadosDeSucursal.push(unUsuario);
      sePudo = true;
    }
    return sePudo;
  }
  async agregarProveedor(res, prov) {
    console.log(prov);
    /*  if (this.buscarEmpleado(user.getLegajo())) {
            throw new Error('El legajo ya se encuentra asignado a otro empleado!');
        } else { */

    await prov.save();
    //}
  }
  async agregarNotificacion(res, nuevaNotificacion) {
    /*  if (this.buscarEmpleado(user.getLegajo())) {
            throw new Error('El legajo ya se encuentra asignado a otro empleado!');
        } else { */

    await nuevaNotificacion.save();
    return true;
    //}
  }

  async agregarUsuario(res, user) {
    if (this.buscarEmpleado(user.getLegajo())) {
      throw new Error("El legajo ya se encuentra asignado a otro empleado!");
    } else {
      await user.save();
    }
  }

  async agregarProductoSucursal(res, prod) {
    let product = await this.buscarProductoPorCodigoBarraSucursal(
      prod.getCodigoBarra()
    );

    if (product[0]) {
      throw new Error("El Producto Sucursal ya se encuentra registrado!");
    } else {
      await prod.save();
      return true;
    }
  }

  async agregarProductoProveedor(res, prod) {
    let product = await this.buscarProductoPorCodigoBarraProveedor(
      prod.getCodigoBarra()
    );

    if (product[0]) {
      throw new Error("El Producto Proveedor ya se encuentra registrado!");
    } else {
      await prod.save();
      return true;
    }
  }

  async listaDeNotificaciones() {
    return await Notificacion.find().lean();
  }
  async listaDeProveedores() {
    return await Proveedor.find().lean();
  }

  async listaDeUsuarios() {
    return await Empleado.find().lean();
  }

  async listaDeProductosSucursal() {
    return await ProductoSucursal.find().lean();
  }

  async listaDeProductosProveedor() {
    return await ProductoProveedor.find().lean();
  }

  async eliminarUsuario(id) {
    await Empleado.findByIdAndDelete(id);
  }

  async eliminarProveedor(id) {
    await Proveedor.findByIdAndDelete(id);
  }

  async eliminarProductoSucursal(id) {
    await ProductoSucursal.findByIdAndDelete(id);
  }

  async eliminarProductoProveedor(id) {
    await ProductoProveedor.findByIdAndDelete(id);
  }

  async eliminarNotificacion(id) {
    await Notificacion.findByIdAndDelete(id);
  }

  async buscarUsuarioPorId(id) {
    return await Empleado.findById(id).lean();
  }

  async buscarNotificacionPorId(id) {
    return await Notificacion.findById(id).lean();
  }
  async buscarProductoPorIdSucursal(id) {
    return await ProductoSucursal.findById(id).lean();
  }
  async buscarProductoPorIdProveedor(id) {
    return await ProductoProveedor.findById(id).lean();
  }

  async buscarProductoPorCodigoBarraSucursal(cod) {
    return await ProductoSucursal.find({ codigoBarra: cod });
  }

  async buscarProductoPorCodigoBarraProveedor(cod) {
    return await ProductoProveedor.find({ codigoBarra: cod });
  }

  async editarProveedor(id, params) {
    return await Proveedor.findByIdAndUpdate(id, params);
  }

  async editarUsuario(id, params) {
    return await Empleado.findByIdAndUpdate(id, params);
  }

  async editarProductoSucursal(id, params) {
    return await ProductoSucursal.findByIdAndUpdate(id, params);
  }

  async editarProductoProveedor(id, params) {
    return await ProductoProveedor.findByIdAndUpdate(id, params);
  }

  getAll() {
    return `Sucursal[idSucursal:${this.idSucursal}, nombreSucursal:${this.nombreSucursal}, ubicacion:${this.ubicacion}, usuarios:${this.usuarios}, productos:${this.productos}]`;
  }

  validarIngreso(cant) {
    const CANT_MIN = 1;
    const CANT_MAX = 1000;
    let pudo = true;
    if (cant < CANT_MIN || cant > CANT_MAX) {
      throw new ErrorDeIncidencia(
        "Intenta ingresar mercaderia fuera de parametros"
      );
    }
    return pudo;
  }

  validarEgreso(cant) {
    const CANT_MIN = 1;
    const CANT_MAX = 50;
    let pudo = true;
    if (cant < CANT_MIN || cant > CANT_MAX) {
      throw new ErrorDeIncidencia(
        "Intenta egresar mercaderia fuera de parametros"
      );
    }
    return pudo;
  }

  hayStock(unProductoDeSucursal, cant) {
    let pudo = true;
    if (unProductoDeSucursal.stock < cant) {
      throw new ErrorDeIncidencia("Esta generando un negativo!");
    }
    return pudo;
  }
}
sucursalSchema.loadClass(Sucursal);
module.exports = model("Sucursal", sucursalSchema);
