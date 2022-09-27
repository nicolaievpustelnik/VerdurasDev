const Sucursal = require('../models/Sucursal');
const Product = require('../models/Product');
const ProductSucursal = require('../models/ProductSucursal');
const ProductProvider = require('../models/ProductProvider');


const newSucursal = new Sucursal({
    idSuc: 1,
    nomSuc: 'Local 1',
    ubicacion: 'Mendoza 1544, Ciudad Autonoma de Buenos Aires',
    users: [],
    products: []
 
});
console.log(newSucursal)
console.log('------------------------------------------')
console.log(newSucursal.getAll())

/* ------------------------------------------------------------------ */
/* --------------------PRODUCTOS DE SUCURSAL------------------------ */
/* ------------------------------------------------------------------ */
let prodSuc1 = new ProductSucursal({
    idProd: 3,
    barCode: 111,
    nomCat: "Frutas",
    marca: "Ecuador",
    description: "Banana",
    stock: 100,
    idSuc: 2,
    salePrice: 155,
 })
 let prodSuc2 = new ProductSucursal({
    idProd: 4,
    barCode: 112,
    nomCat: "Frutas",
    marca: "Frut",
    description: "Melon",
    stock: 200,
    idSuc: 1,
    salePrice: 250,
 })
 let prodSuc3 = new ProductSucursal({
    idProd: 5,
    barCode: 113,
    nomCat: "Verdura",
    marca: "Landa",
    description: "Zanahoria",
    stock: 500,
    idSuc: 2,
    salePrice: 300,
 })
newSucursal.addProduct(prodSuc1)
newSucursal.addProduct(prodSuc2)
newSucursal.addProduct(prodSuc3)

/* ------------------------------------------------------------------ */
/* --------------------PRODUCTOS DE PROVEEDOR------------------------ */
/* ------------------------------------------------------------------ */
let prodProv1 = new ProductProvider({
   idProd: 11,
   barCode: 221,
   nomCat: "Frutas",
   marca: "Prov1",
   description: "Banana",
   stock: 1500,
   idProv: 1,
   purchasePrice: 30,
})
let prodProv2 = new ProductProvider({
   idProd: 12,
   barCode: 222,
   nomCat: "Frutas",
   marca: "Prov2",
   description: "Mandarina",
   stock: 1000,
   idProv: 3,
   purchasePrice: 50,
})
let prodProv3 = new ProductProvider({
   idProd: 13,
   barCode: 223,
   nomCat: "Verduras",
   marca: "Prov3",
   description: "Apio",
   stock: 2000,
   idProv: 2,
   purchasePrice: 80,
})
newSucursal.addProduct(prodProv1)
newSucursal.addProduct(prodProv2)
newSucursal.addProduct(prodProv3)


console.log(newSucursal)
//console.log(newSucursal.listOfProducts())


// console.log('------------------------------------------')
// console.log(newSucursal.getAll())

