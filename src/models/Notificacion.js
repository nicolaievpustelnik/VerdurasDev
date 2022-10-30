const { model } = require('mongoose');

const notificacionSchema = require('./schemas/NotificacionSchema');

class Notificacion {

  constructor(message) {
    this.message = message;
  }

  imprimirMensaje() {
    return this.message;
  }

}

notificacionSchema.loadClass(Notificacion);
module.exports = model("Notificacion", notificacionSchema);
