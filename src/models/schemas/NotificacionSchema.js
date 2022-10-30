const { Schema } = require("mongoose");

const notificacionSchema = new Schema(
  {
    mensaje: {
      type: String,
      require: true,
    },
  },
  {
    timestamps: true,
  }
);
module.exports = notificacionSchema;
