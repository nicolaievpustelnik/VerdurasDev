const Sucursal = require('../models/Sucursal');
const Empleado = require('../models/Empleado');
const ProductoSucursal = require('../models/ProductoSucursal');
const ProductoProveedor = require('../models/ProductoProveedor');

const newSucursal = new Sucursal({
   idSucursal: 1,
   nomSucursal: 'Local 1',
   ubicacion: 'Mendoza 1544, Ciudad Autonoma de Buenos Aires',
   usuarios: [],
   productos: []

});
<<<<<<< HEAD:src/controller/sucursalController.js

//console.log(newSucursal.getAll())
=======
console.log(newSucursal)
console.log('------------------------------------------')
>>>>>>> 03b1b0e497fce3b1003c219b54ffc94a34c104f9:src/controllers/sucursal.controller.js


/* ----------------------------------------------------------------- */
/* --------------------PRODUCTOS DE SUCURSAL------------------------ */
/* ----------------------------------------------------------------- */
let prodsSuc = new ProductoSucursal({
   idProducto: 3,
   codigoBarra: 111,
   nombreCategoria: "Frutas",
   marca: "Ecuador",
   description: "Banana",
   stock: 100,
   idSucursal: 2,
   precioVenta: 155,
}, {

   idProducto: 4,
   codigoBarra: 112,
   nombreCategoria: "Frutas",
   marca: "Frut",
   description: "Melon",
   stock: 200,
   idSucursal: 1,
   precioVenta: 250,
}, {
   idProducto: 5,
   codigoBarra: 113,
   nombreCategoria: "Verdura",
   marca: "Landa",
   description: "Zanahoria",
   stock: 500,
   idSucursal: 2,
   precioVenta: 300,
})

newSucursal.agregarProducto(prodsSuc)

/* ------------------------------------------------------------------ */
/* --------------------PRODUCTOS DE PROVEEDOR------------------------ */
/* ------------------------------------------------------------------ */
let prodsProv = new ProductoProveedor({
   idProducto: 11,
   codigoBarra: 221,
   nombreCategoria: "Frutas",
   marca: "Prov1",
   description: "Banana",
   stock: 1500,
   idProveedor: 1,
   precioCompra: 30,
}, {
   idProducto: 12,
   codigoBarra: 222,
   nombreCategoria: "Frutas",
   marca: "Prov2",
   description: "Mandarina",
   stock: 1000,
   idProveedor: 3,
   precioCompra: 50,
}, {
   idProducto: 13,
   codigoBarra: 223,
   nombreCategoria: "Verduras",
   marca: "Prov3",
   description: "Apio",
   stock: 2000,
   idProveedor: 2,
   precioCompra: 80,
});

newSucursal.agregarProducto(prodsProv)

/* ------------------------------------------------------------------ */
/* --------------------LISTA DE EMPLEADOS------------------------ */
/* ------------------------------------------------------------------ */
const newEmpleados = new Empleado({
   nombre: "Nicolaiev",
   apellido: "Brito",
   email: "nicolaievbrito@gmail.com",
   password: "12345",
   sucursal: "2"
}, {
   nombre: "Jorge",
   apellido: "Perez",
   email: "jorgo@gmail.com",
   password: "123456",
   sucursal: "1"
}, {
   nombre: "Emiliano",
   apellido: "Brito",
   email: "emi@gmail.com",
   password: "12345678",
   sucursal: "1"
});

<<<<<<< HEAD:src/controller/sucursalController.js
newSucursal.addUser(newEmployees)

console.log(newSucursal.getAll())
=======
newSucursal.agregarUsuario(newEmpleados)
>>>>>>> 03b1b0e497fce3b1003c219b54ffc94a34c104f9:src/controllers/sucursal.controller.js

console.log(newSucursal.getAll())