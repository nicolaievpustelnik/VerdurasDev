const { model } = require("mongoose");

class Report {
  constructor(Notification, idProduct, idProvider, idUser) {
    this.Notification = Notification;
    this.idProduct = idProduct;
    this.idProvider = idProvider;
    this.idUser = idUser;
  }

  getAll() {
    return `Report[Notification:${this.Notification}, idProduct:${this.idProduct}, lastName:${this.email}, lastName:${this.password}, sucursal:${this.sucursal}]`;
  }
}

reportSchema.loadClass(Report);
module.exports = model("Report", reportSchema);
