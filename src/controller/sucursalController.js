const Sucursal = require('../models/Sucursal');
const Product = require('../models/Product');
const ProductSucursal = require('../models/ProductSucursal');
const ProductProvider = require('../models/ProductProvider');
const Employee = require('../models/Employee');


const newSucursal = new Sucursal({
   idSuc: 1,
   nomSuc: 'Local 1',
   ubicacion: 'Mendoza 1544, Ciudad Autonoma de Buenos Aires',
   users: [],
   products: []

});
console.log(newSucursal)
console.log('------------------------------------------')
//console.log(newSucursal.getAll())

/* ------------------------------------------------------------------ */
/* --------------------PRODUCTOS DE SUCURSAL------------------------ */
/* ------------------------------------------------------------------ */
let prodsSuc = new ProductSucursal({
   idProd: 3,
   barCode: 111,
   nomCat: "Frutas",
   marca: "Ecuador",
   description: "Banana",
   stock: 100,
   idSuc: 2,
   salePrice: 155,
}, {

   idProd: 4,
   barCode: 112,
   nomCat: "Frutas",
   marca: "Frut",
   description: "Melon",
   stock: 200,
   idSuc: 1,
   salePrice: 250,
}, {
   idProd: 5,
   barCode: 113,
   nomCat: "Verdura",
   marca: "Landa",
   description: "Zanahoria",
   stock: 500,
   idSuc: 2,
   salePrice: 300,
})
newSucursal.addProduct(prodsSuc)

/* ------------------------------------------------------------------ */
/* --------------------PRODUCTOS DE PROVEEDOR------------------------ */
/* ------------------------------------------------------------------ */
let prodsProv = new ProductProvider({
   idProd: 11,
   barCode: 221,
   nomCat: "Frutas",
   marca: "Prov1",
   description: "Banana",
   stock: 1500,
   idProv: 1,
   purchasePrice: 30,
}, {
   idProd: 12,
   barCode: 222,
   nomCat: "Frutas",
   marca: "Prov2",
   description: "Mandarina",
   stock: 1000,
   idProv: 3,
   purchasePrice: 50,
}, {
   idProd: 13,
   barCode: 223,
   nomCat: "Verduras",
   marca: "Prov3",
   description: "Apio",
   stock: 2000,
   idProv: 2,
   purchasePrice: 80,
});

newSucursal.addProduct(prodsProv)

/* ------------------------------------------------------------------ */
/* --------------------LISTA DE EMPLEADOS------------------------ */
/* ------------------------------------------------------------------ */
const newEmployees = new Employee({
   firstName: "Nicolaiev",
   lastName: "Brito",
   email: "nicolaievbrito@gmail.com",
   password: "12345",
   sucursal: "2"
}, {
   firstName: "Jorge",
   lastName: "Perez",
   email: "jorgo@gmail.com",
   password: "123456",
   sucursal: "1"
}, {
   firstName: "Emiliano",
   lastName: "Brito",
   email: "emi@gmail.com",
   password: "12345678",
   sucursal: "1"
});

newSucursal.addUser(newEmployees)

//console.log(newSucursal)
//console.log(newSucursal.listOfProducts())


// console.log('------------------------------------------')
console.log(newSucursal.getAll())

