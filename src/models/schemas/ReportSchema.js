const { Schema } = require("mongoose");

const reportSchema = new Schema(
  {
    Notification: {
      type: {},
      require: true,
    },

    idProduct: {
      type: Number,
      require: true,
    },

    idProvider: {
      type: Number,
      require: true,
    },

    idUser: {
      type: Number,
      require: true,
    },
  },
  {
    timestamps: true,
  }
);
module.exports = reportSchema;
