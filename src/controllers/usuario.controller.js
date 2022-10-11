const Admin = require('../models/Admin');

// Codigo de prueba: Ejecutar en la terminal $node src/controllers/user.controller.js

const newAdmin = new Admin({ nombre: "Nicolaiev", apellido: "Brito", email: "nicolaievbrito@gmail.com", password: "12345", sucursal: "1" });
console.log(newAdmin)
console.log(newAdmin.getNombreCompleto())