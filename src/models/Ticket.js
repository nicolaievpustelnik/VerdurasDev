const { model } = require("mongoose");

const notificacionSchema = require("./schemas/NotificacionSchema");

class Ticket {
  constructor(nombreCompletoEmpleado, mensaje, fecha, importe) {
    this.nombreCompletoEmpleado = nombreCompletoEmpleado;
    this.mensaje = mensaje;
    this.fecha = fecha;
    this.importe = importe;
  }
  getAll() {
    return `Ticket[Empleado:${this.nombreCompletoEmpleado}, mensaje:${this.mensaje}, Date:${this.fecha},importe:${this.importe}`;
  }
}
notificacionSchema.loadClass(Ticket);
module.exports = model("Notificacion", notificacionSchema);
