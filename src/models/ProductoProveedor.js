const { model } = require('mongoose');

const Producto = require('./Producto');
const productoSchema = require('./schemas/ProductoSchema');

class ProductoProveedor extends Producto {

    constructor(idProducto, codigoBarra, nombreCategoria, descripcion, stock, precioCompra) {
        super(idProducto, codigoBarra, nombreCategoria, descripcion, stock);
        this.idProveedor = idProveedor;
        this.precioCompra = precioCompra;
    }

    getAll() {
        return `ProductoProveedor[codigoBarra:${this.codigoBarra}, nombreCategoria:${this.nombreCategoria}, description:${this.description}, stock:${this.stock}, precioCompra:${this.precioCompra}]`;
    }

    getPrecioCompra() {
        return this.precioCompra;
    }
    
    getCodigoBarra(){
        return this.codigoBarra
    }

    getIdProducto(){
        return this.idProducto
    }
}

productoSchema.loadClass(ProductoProveedor);
module.exports = model('ProductoProveedor', productoSchema);