const { model } = require('mongoose');

const notificacionSchema = require('./schemas/NotificacionSchema');

class Notificacion {
  constructor(nombreCompletoEmpleado, mensaje) {
    this.nombreCompletoEmpleado = nombreCompletoEmpleado;
    this.mensaje = mensaje;
    this.fecha = this.Date.today();
  }
  getAll() {
    return `Notificacion[Empleado:${this.nombreCompletoEmpleado}, mensaje:${this.mensaje}, Date:${this.fecha}`;
  }
}
notificacionSchema.loadClass(Notificacion);
module.exports = model("Notificacion", notificacionSchema);