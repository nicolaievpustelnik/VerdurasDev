const { model } = require("mongoose");
const reportSchema = require("./schemas/ReportSchema");

class Report {
  constructor(Notification, idProduct, idProvider, idUser) {
    this.Notification = Notification;
    this.idProduct = idProduct;
    this.idProvider = idProvider;
    this.idUser = idUser;
  }

  getAll() {
    return `Report[Notification:${this.Notification}, idProduct:${this.idProduct}, idProvider: ${this.idProvider}, idUser: ${this.idUser}]`;
  }
}

reportSchema.loadClass(Report);
module.exports = model("Report", reportSchema);
