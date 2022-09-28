const Report = require("../models/Report");

const newReport = new Report({
  Notification: Notification,
  idProduct: 1,
  idProvider: 7,
  idUser: 9,
});

console.log(newReport);
console.log("------------------------------------------");
console.log(newReport.getAll());
