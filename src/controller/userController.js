
const Admin = require('../models/Admin');
const Product = require('../models/Product');

// Codigo de preuba: Ejecutar en la terminal $node src/controller/userController.js

const newAdmin = new Admin({ firstName: "Nicolaiev", lastName: "Brito", email: "nicolaievbrito@gmail.com", password: "12345", sucursal: "1" });
console.log(newAdmin)
console.log('------------------------------------------')
console.log(newAdmin.getAll())

const newProduct = new Product({
    barCode: 1234567894555,
    nomCat: 'Verduras',
    idSuc: '1',
    idSupplier: '1',
    marca: 'Tamara',
    description: 'Frutilla',
    stock: 100,
    salePrice: 155,
    purchasePrice: 100

    
});
console.log(newProduct)
console.log('------------------------------------------')
console.log(newProduct.getAll())

