const Sucursal = require('../Sucursal');
const Empleado = require('../models/Empleado');
const ProductoSucursal = require('../models/ProductoSucursal');
const Rol = require('../models/Rol');

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
});
newSucursal.agregarProducto(prodsSuc);

prodsSuc = new ProductoSucursal({

   idProducto: 4,
   codigoBarra: 112,
   nombreCategoria: "Frutas",
   marca: "Frut",
   descripcion: "Melon",
   stock: 200,
   idSucursal: 1,
   precioVenta: 250,
});
newSucursal.agregarProducto(prodsSuc);

prodsSuc = new ProductoSucursal({
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
let nuevoEmpleado = new Empleado({
   nombre: "Nicolaiev",
   apellido: "Brito",
   email: "nicolaievbrito@gmail.com",
   password: "12345",
   sucursal: "2",
   rol: Rol.CAJERO.name
});
newSucursal.agregarUsuario(nuevoEmpleado)

nuevoEmpleado = new Empleado({
   nombre: "Jorge",
   apellido: "Perez",
   email: "jorgo@gmail.com",
   password: "123456",
   sucursal: "1",
   rol: Rol.ORGANIZADOR.name
});
newSucursal.agregarUsuario(nuevoEmpleado)

nuevoEmpleado = new Empleado({
   nombre: "Emiliano",
   apellido: "Brito",
   email: "emi@gmail.com",
   password: "12345678",
   sucursal: "1",
   rol: Rol.RECEPCIONISTA.name
});
newSucursal.agregarUsuario(nuevoEmpleado)

console.log(newSucursal.getAll())