const Product = require('../models/Product');

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

