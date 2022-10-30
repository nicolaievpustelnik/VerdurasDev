const ProductoSucursal = require('../models/ProductoSucursal');

// Codigo de prueba: Ejecutar en la terminal $node src/controllers/producto.controller.js

const newProductSuc1 = new ProductoSucursal({
    idProducto: 1,
    codigoBarra: 10,
    nombreCategoria: "Verduras",
    marca: "Tamara",
    description: "Frutilla",
    stock: 100,
    idSucursal: 2,
    precioVenta: 155,
});
console.log(newProductSuc1)
console.log(newProductSuc1.getAll())