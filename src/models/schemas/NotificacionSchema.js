const { Schema } = require("mongoose");

const notificacionSchema = new Schema(
  {
    nombreCompletoEmpleado: {
      type: String,
      require: true,
    },
    mensaje: {
      type: String,
      require: true,
    },
    fecha: {
      type: String,
      require: true,
    }
  },
  {
    timestamps: true,
  }
);
module.exports = notificacionSchema;
