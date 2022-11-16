const { model } = require("mongoose");
const reporteSchema = require("./schemas/ReporteSchema");

class Reporte {

  constructor(notificacion, idProducto, idProveedor, idUsuario, fecha) {
    this.notificacion = notificacion;
    this.idProducto = idProducto;
    this.idProveedor = idProveedor;
    this.idUsuario = idUsuario;
    this.fecha = fecha;
  }

  getIdUsuario() {
    return this.idUsuario;
  }

  getFecha() {
    return this.fecha;
  }

  getAll() {
    return `Reporte[notificacion:${this.notificacion}, idProducto:${this.idProducto}, idProveedor: ${this.idProveedor}, idUsuario: ${this.idUsuario}, fecha: ${this.fecha}]`;
  }
}

reporteSchema.loadClass(Reporte);
module.exports = model("Reporte", reporteSchema);
