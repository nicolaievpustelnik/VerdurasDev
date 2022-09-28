const { model } = require('mongoose');

const notificationSchema = require('./schemas/notificationSchema');


class Notification {
  constructor(message) {
    this=message;
  }


    printMessage() {
    console.log(this.message)
    }
}

notificationSchema.loadClass(Notification);
module.exports = model("Notification", notificationSchema);
