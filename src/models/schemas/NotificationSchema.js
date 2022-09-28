const { Schema } = require("mongoose");

const notificationSchema = new Schema(
  {
    message: {
      type: String,
      require: true,
    },
  },
  {
    timestamps: true,
  }
);
module.exports = notificationSchema;
