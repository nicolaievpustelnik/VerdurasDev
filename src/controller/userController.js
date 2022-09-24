
const Admin = require('../models/Admin');

// Codigo de prueba: Ejecutar en la terminal $node src/controller/userController.js

const newAdmin = new Admin({ firstName: "Nicolaiev", lastName: "Brito", email: "nicolaievbrito@gmail.com", password: "12345", sucursal: "1" });
console.log(newAdmin)
console.log(newAdmin.getFullName())

