const Sucursal = require('../models/Sucursal');
const Empleado = require('../models/Empleado');
const ProductoSucursal = require('../models/ProductoSucursal');

const newSucursal = new Sucursal({
   idSucursal: 1,
   nomSucursal: 'Local 1',
   ubicacion: 'Mendoza 1544, Ciudad Autonoma de Buenos Aires',
   usuarios: [],
   productos: []

});

//console.log(newSucursal.getAll())


/* ----------------------------------------------------------------- */
/* --------------------PRODUCTOS DE SUCURSAL------------------------ */
/* ----------------------------------------------------------------- */
let prodsSuc = new ProductoSucursal({
   idProducto: 3,
   codigoBarra: 111,
   nombreCategoria: "Frutas",
   marca: "Ecuador",
   descripcion: "Banana",
   stock: 100,
   idSucursal: 2,
   precioVenta: 155,
}, {

   idProducto: 4,
   codigoBarra: 112,
   nombreCategoria: "Frutas",
   marca: "Frut",
   descripcion: "Melon",
   stock: 200,
   idSucursal: 1,
   precioVenta: 250,
}, {
   idProducto: 5,
   codigoBarra: 113,
   nombreCategoria: "Verdura",
   marca: "Landa",
   descripcion: "Zanahoria",
   stock: 500,
   idSucursal: 2,
   precioVenta: 300,
})

newSucursal.agregarProducto(prodsSuc)

/* ------------------------------------------------------------------ */
/* --------------------LISTA DE EMPLEADOS------------------------ */
/* ------------------------------------------------------------------ */
const nuevoEmpleado = new Empleado({
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

newSucursal.agregarEmpleado(nuevoEmpleado)

console.log(newSucursal.getAll())