const { model } = require('mongoose');

const notificacionSchema = require('./schemas/notificacionSchema');

class Notificacion {
  constructor(empleado, mensaje) {
    this=empleado;
    this=mensaje;
    this.Date.today();
    }
    getAll(){
        return `Notificacion[Empleado:${this.employee}, mensaje:${this.mensaje},Date:${Date.today()}`;}
    }      
 notificacionSchema.loadClass(Notificacion);
module.exports = model("Notificacion", notificacionSchema);
  