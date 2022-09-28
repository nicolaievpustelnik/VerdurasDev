const { model } = require("mongoose");
const reportSchema = require("./schemas/ReportSchema");

class Report {
  constructor(Notification, idProduct, idProvider, idUser, date) {
    this.Notification = Notification;
    this.idProduct = idProduct;
    this.idProvider = idProvider;
    this.idUser = idUser;
    this.date = date;
  }

  getIdUser() {
    return this.idUser;
  }
  getDate() {
    return this.date;
  }

  getAll() {
    return `Report[Notification:${this.Notification}, idProduct:${this.idProduct}, idProvider: ${this.idProvider}, idUser: ${this.idUser}, date: ${this.date}]`;
  }
}

reportSchema.loadClass(Report);
module.exports = model("Report", reportSchema);
