const { model } = require("mongoose");

const notificacionSchema = require("./schemas/NotificacionSchema");

class Notificacion {
  constructor(nombreCompletoEmpleado, mensaje, fecha) {
    this.nombreCompletoEmpleado = nombreCompletoEmpleado;
    this.mensaje = mensaje;
    this.fecha = fecha;
  }
  getAll() {
    return `Notificacion[Empleado:${this.nombreCompletoEmpleado}, mensaje:${this.mensaje}, Date:${this.fecha}`;
  }
}
notificacionSchema.loadClass(Notificacion);
module.exports = model("Notificacion", notificacionSchema);
