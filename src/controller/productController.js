/* const Product = require('../models/Product');

const newProduct = new Product({
    barCode: 1234567894555,
    nomCat: "Verduras",
    idSuc: "1",
    idSupplier: "1",
    marca: "Tamara",
    description: "Frutilla",
    stock: 100,
    salePrice: 155,
    purchasePrice: 100
});

console.log(newProduct)
console.log('------------------------------------------')
console.log(newProduct.getAll()) */

const ProductSucursal = require('../models/ProductSucursal');

// Codigo de prueba: Ejecutar en la terminal $node src/controller/userController.js

const newProductSuc1 = new ProductSucursal({ 
    idProd: 1,
    barCode: 10,
    nomCat: "Verduras",
    marca: "Tamara",
    description: "Frutilla",
    stock: 100,
    idSuc: 2,
    salePrice: 155,
});
console.log(newProductSuc1)
console.log(newProductSuc1.getAll())