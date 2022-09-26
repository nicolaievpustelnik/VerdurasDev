const { model } = require('mongoose');
const sucursalSchema = require('./SucursalSchema');
const Product = require('../models/Product');
class Sucursal {
    constructor(idSuc, nomSuc, ubicacion) {
        this.idSuc = idSuc;
        this.nomSuc = nomSuc;
        this.ubicacion = ubicacion;
        this.users = [];
        this.products = [];
    }
    getAll() {
        return `Sucursal[idSuc:${this.idSuc}, nomSuc:${this.nomSuc}, ubicacion:${this.ubicacion}, users:${this.users}, products:${this.products}]`;
    }
    listOfProducts(){
        return this.products
    }
    listOfUsuarios(){
        return this.users
    }
  /*   addProduct(){
        return new Product(1234567888888, 'Verduras', '2', '5', 'Tama', 'Papa', 120, 15000, 10000)
    } */
    saludar(){
      return `Hola Mundo`  
    }
/* agregarProducto(unProducto){
products.push(unProducto)
} */
}



sucursalSchema.loadClass(Sucursal);
module.exports = model('Sucursal', sucursalSchema);
/* module.exports = {
    claseModelo: Sucursal,
    fnAddProduct: addProduct,
    fnlistaProductos: listarProductos,
    fnlistaUsuarios: listarUsuarios,
} */