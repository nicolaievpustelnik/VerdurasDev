const { model } = require('mongoose');

const Producto = require('./Producto');
const productoSchema = require('./schemas/ProductoSchema');

class ProductoProveedor extends Producto {

    constructor(idProducto, codigoBarra, nombreCategoria, marca, descripcion, stock, idProveedor, precioCompra) {
        super(idProducto, codigoBarra, nombreCategoria, marca, descripcion, stock);
        this.idProveedor = idProveedor;
        this.precioCompra = precioCompra;
    }

    getAll() {
        return `ProductoProveedor[idProducto:${this.idProducto},codigoBarra:${this.codigoBarra}, nombreCategoria:${this.nombreCategoria}, marca:${this.marca}, description:${this.description}, stock:${this.stock}, idProveedor:${this.idProveedor}, precioCompra:${this.precioCompra}]`;
    }
}

productoSchema.loadClass(ProductoProveedor);
module.exports = model('ProductoProveedor', productoSchema);