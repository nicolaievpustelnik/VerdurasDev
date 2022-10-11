const { Schema } = require("mongoose");

const reporteSchema = new Schema(
  {
    Notification: {
      type: {},
      require: true,
    },

    idProducto: {
      type: Number,
      require: true,
    },

    idProveedor: {
      type: Number,
      require: true,
    },

    idUsuario: {
      type: Number,
      require: true,
    },
    fecha: {
      type: Number,
      require: true,
    },
  },
  {
    timestamps: true,
  }
);
module.exports = reporteSchema;
