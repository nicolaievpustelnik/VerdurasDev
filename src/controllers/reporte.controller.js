const Reporte = require("../models/Reporte");
const Notificacion = require("../models/Notificacion");

let newNoti = new Notificacion({nombreCompletoEmpleado:"nombreCompletoEmpleado", mensaje: "mensaje", fecha: "fecha" });

console.log(newNoti)

/* const newReporte = new Reporte({
  notificacion: newNoti,
  idProducto: 1,
  idProveedor: 7,
  idUsuario: 9,
});

console.log(newReporte);
console.log("------------------------------------------");
console.log(newReporte.getAll()); */