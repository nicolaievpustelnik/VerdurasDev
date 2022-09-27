const Sucursal = require('../models/Sucursal');
const Product = require('../models/Product');


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


let p = new Product({ barCode: 123, nomCat: "nom", idSuc: "1", idSupplier: "1234", marca: "sadasdasd", description: "sksjhdgf", stock: 100, salePrice: 500, purchasePrice: 400 })

newSucursal.setProduct(p)

console.log(newSucursal)
// console.log('------------------------------------------')
// console.log(newSucursal.getAll())

