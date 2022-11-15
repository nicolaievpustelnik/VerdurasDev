const { Schema } = require("mongoose");

const ticketSchema = new Schema(
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
    },
    importe: {
      type: Number,
      require: true,
    },
  },
  {
    timestamps: true,
  }
);
module.exports = ticketSchema;
