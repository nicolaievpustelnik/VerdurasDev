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

  obtenerUsuarioLogueado(res) {
    let unEmpleado = res.locals.user;
    if (!unEmpleado) {
      throw new Error("No inicio Sesion!");
    }
    return unEmpleado;
  }

  validarSiEsDeSucursal(res, nombreSucursalRecibido) {
    let esValido = false;
    let usuarioLogueado = this.obtenerUsuarioLogueado(res);
    if (!(nombreSucursalRecibido == usuarioLogueado.sucursal)) {
      throw new ErrorDeIncidencia("Entrando a sucursal que no corresponde")
    }
    esValido = true;
    return esValido;
  }

  async recepcionarProductoSucursal(res, cuil, scanner, cant) {
    let seRecepciono = false;
    var unEmpleado = this.obtenerUsuarioLogueado(res);
    if (unEmpleado) {
      let rolValido = await this.verificarRol(unEmpleado, rolEnum.RECEPCIONISTA);
      if (rolValido) {
        let unProveedor = await this.obtenerProveedor(cuil);
        if (unProveedor) {
          let unProductoSucursal = await this.buscarProductoPorCodigoBarraSucursal(scanner);
          if (unProductoSucursal) {
            if (this.validarIngreso(cant)) {
              await this.ActualizarStockProducto(unProductoSucursal, cant)
              seRecepciono = true;
              await this.generarMovimiento(cant, unProductoSucursal, unProveedor);
              //await this.generarComprobante(unMovimiento,)	                await this.generarMovimiento(cant, unProductoSucursal[0], unProveedor[0]);
            }
          }
        }
      }
    }
    return seRecepciono;
  }

  async verificarRol(unEmpleado, unRol) {
    let verificado = false;
    if (!(unEmpleado.rol[0] === unRol.name || unEmpleado.rol[0] === rolEnum.ORGANIZADOR.name)) {
      throw new ErrorDeIncidencia("Intenta ejecutar una tarea no autorizada");
    }
    verificado = true;
    return verificado;
  }

  async dispararAlerta(res, err) {
    if (err instanceof ErrorDeIncidencia) {
      console.log("estoy en disparar alerta")
      let usuarioLogueado = this.obtenerUsuarioLogueado(res);
      let unaNotificacion = new Notificacion({
        nombreCompletoEmpleado: usuarioLogueado.nombre,
        mensaje: err.message,
        fecha: new Date().toLocaleString(),
      });
      console.log("hay notificacio1n" + unaNotificacion)
      await unaNotificacion.save();
    } else {
      console.log("Otro tipo de error: " + err.name + " --> " + err.message);
    }
  }

  async egresarProducto(res, dni, scanner, cant) {
    let seEgreso = false;
    var unEmpleado = this.obtenerUsuarioLogueado(res);
    if (unEmpleado) {
      if (this.verificarRol(unEmpleado, rolEnum.CAJERO)) {
        let unCliente = new Cliente({ dniCliente: dni, nombreCliente: "Matias", });
        let unProductoSucursal = await this.buscarProductoPorCodigoBarraSucursal(scanner);
        if (unProductoSucursal) {
          if (this.hayStock(unProductoSucursal, cant)) {
            if (this.validarEgreso(cant)) {
              await this.agregarCliente(unCliente);
              await this.ActualizarStockProducto(unProductoSucursal, -cant)
              seEgreso = true;
              await this.generarMovimiento(cant, unProductoSucursal, unCliente);
            }
          }
        }
      }
    }
    return seEgreso;
  }

  async generarMovimiento(cant, unProducto, unProveedor) {
    let monto = await this.calcularMonto(cant, unProveedor, unProducto);
    let movimiento = null;
    if (unProveedor instanceof Cliente) {
      movimiento = await this.generarVenta(cant, unProducto, unProveedor, monto);
    } else {
      movimiento = await this.generarCompra(cant, unProducto, unProveedor, monto);
    }
    return movimiento;
  }

  async agregarCliente(cliente) {
    await cliente.save();
  }

  async generarVenta(cant, unProducto, proveedor, monto) {
    let venta = new Movimiento({
      cant: cant,
      descripcionProducto: unProducto.descripcion,
      nombreEnte: proveedor.nombreCliente,
      monto: monto,
      fecha: new Date().toLocaleDateString(),
      tipo: "Venta",
    });
    await venta.save();
    return venta;
  }

  async generarCompra(cant, unProducto, proveedor, monto) {
    let compra = new Movimiento({
      cant: cant,
      descripcionProducto: unProducto.descripcion,
      nombreEnte: proveedor.nombreProveedor,
      monto: monto,
      fecha: new Date().toLocaleDateString(),
      tipo: "Compra",
    });
    await compra.save();
    return compra;
  }

  async calcularMonto(cant, prov, unProducto) {
    var unMonto = 0;
    if (prov instanceof Cliente) {
      unMonto = cant * unProducto.precioVenta;
    } else {
      let productoBuscado = await this.buscarProductoPorCodigoBarraProveedor(unProducto.codigoBarra)
      unMonto = parseFloat(cant) * parseFloat(productoBuscado.precioCompra);
    }
    return unMonto;
  }

  async obtenerProveedor(cuil) {
    let proveedorEncontrado = await Proveedor.findOne({ cuilProveedor: cuil });
    if (!proveedorEncontrado) {
      throw new ErrorDeIncidencia("Intenta ingresar mercaderia a proveedor no autorizado");
    }
    return proveedorEncontrado;
  }

  async buscarEmpleado(legajo) {
    return await Empleado.find({ legajo: legajo });
  }

  async agregarProveedor(res, prov) {
    let proveedorBuscado = await this.hayProveedor(prov.cuilProveedor);
    if (proveedorBuscado) {
      throw new Error("Ya existe un proveedor con ese Cuil");
    }
    await prov.save();
  }

  async hayProveedor(cuil) {
    return await Proveedor.findOne({ cuilProveedor: cuil });
  }

  async agregarNotificacion(res, nuevaNotificacion) {
    await nuevaNotificacion.save();
    return true;

  }

  async agregarUsuario(req, res, user, jsonResponse) {

    let userLegajo = await this.buscarUsuarioPorEmail(user.getEmail());

    if (userLegajo.length > 0) {

      if (jsonResponse == true) {
        res.sendStatus(403);
      } else {
        req.flash('error_msg', "Email existente");
        //throw new Error("El email ya se encuentra asignado a otro empleado!");
      }

      return false;

    } else {
      await user.save();
      return true;
    }
  }

  async agregarProductoSucursal(req, res, prod, jsonResponse) {
    let product = await this.buscarProductoCodigoBarrasSucursal(
      prod.getCodigoBarra()
    );

    if (product) {
      if (jsonResponse == true) {
        res.sendStatus(403);
      } else {
        req.flash('error_msg', "Producto existente");
      }
      return false;
    } else {
      await prod.save();
      return true;
    }
  }

  async agregarProductoProveedor(req, res, prod, jsonResponse) {
    let product = await this.buscarProductoCodigoBarrasProveedor(
      prod.getCodigoBarra()
    );

    if (product) {
      if (jsonResponse == true) {
        res.sendStatus(403);
      } else {
        req.flash('error_msg', "Producto existente");
      }
      return false;
    } else {
      await prod.save();
      return true;
    }

  }
  async listaDeMovimientos() {
    return await Movimiento.find().lean();
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
    let unProveedor = await this.buscarProveedorPorId(id);
    if (!unProveedor) {
      throw new Error("El Id recibido no existe!")
    }
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
  async eliminarMovimiento(id) {
    await Movimiento.findByIdAndDelete(id);
  }
  async buscarUsuarioPorId(id) {
    return await Empleado.findById(id).lean();
  }
  async buscarProveedorPorCuil(cuil) {
    let unProveedor = await Proveedor.findOne({ cuilProveedor: cuil });
    if (!unProveedor) {
      throw new Error("Proveedor no existe")
    }
    return unProveedor
  }

  async buscarUsuarioPorLegajo(legajo) {
    return await Empleado.find({ legajo: legajo });
  }

  async buscarUsuarioPorEmail(email) {
    return await Empleado.find({ email: email });
  }

  async buscarNotificacionPorId(id) {
    return await Notificacion.findById(id).lean();
  }

  async buscarMovimientoPorId(id) {
    return await Notificacion.findById(id).lean();
  }

  async buscarProductoIdSucursal(id) {
    return await ProductoSucursal.find({ productoId: productoId });
  }

  async buscarProductoIdProveedor(idProducto) {
    return await ProductoProveedor.find({ idProducto: idProducto });
  }

  async buscarProveedorPorId(id) {
    return await Proveedor.findById(id).lean();
  }

  async buscarProductoPorIdSucursal(id) {
    return await ProductoSucursal.findById(id).lean();
  }

  async buscarProductoPorIdProveedor(id) {
    return await ProductoProveedor.findById(id).lean();
  }

  async buscarProductoPorCodigoBarraSucursal(cod) {
    let unProducto = await ProductoSucursal.findOne({ codigoBarra: cod });
    if (!unProducto) {
      throw new ErrorDeIncidencia("Intenta gestionar producto fuera de surtido, registre el producto");
    }
    return unProducto
  }

  async buscarProductoPorCodigoBarraProveedor(cod) {
    return await ProductoProveedor.findOne({ codigoBarra: cod });
  }

  async buscarProductoCodigoBarrasProveedor(codigoBarra) {
    return await ProductoProveedor.findOne({ codigoBarra: codigoBarra });
  }

  async buscarProductoCodigoBarrasSucursal(codigoBarra) {
    return await ProductoSucursal.findOne({ codigoBarra: codigoBarra });
  }

  async editarProveedor(id, params) {
    let unProveedor = await this.buscarProveedorPorCuil(params.cuilProveedor);
    if (unProveedor && id != unProveedor._id) {
      throw new Error("El numero de cuil ya se encuentra asignado a otro Proveedor!");
    }
    return await Proveedor.findByIdAndUpdate(id, params);
  }

  async ActualizarStockProducto(unProducto, cant) {
    let idProducto = unProducto._id;
    let cantActualizada = 0;
    cantActualizada = unProducto.stock += parseFloat(cant);
    let productoActualizado = new ProductoSucursal({
      _id: idProducto,
      stock: cantActualizada,
    })
    await this.editarProductoSucursal(idProducto, productoActualizado)
  }

  async editarUsuario(id, params) {
    try {
      return await Empleado.findByIdAndUpdate(id, params);
    } catch (error) {
      return false;
    }
  }

  async editarProductoSucursal(id, params) {
    return await ProductoSucursal.findByIdAndUpdate(id, params);
  }

  async editarProductoProveedor(id, params) {
    return await ProductoProveedor.findByIdAndUpdate(id, params);
  }

  async editarNotificacion(id, params) {
    return await Notificacion.findByIdAndUpdate(id, params);
  }

  async editarMovimiento(id, params) {
    return await Movimiento.findByIdAndUpdate(id, params);
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
