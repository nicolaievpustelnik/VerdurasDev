const { model } = require('mongoose');

const Producto = require('./Producto');
const productoSchema = require('./schemas/ProductoSchema');

class ProductoProveedor extends Producto {

    constructor(codigoBarra, nombreCategoria, marca, descripcion, stock, precioCompra) {
        super(codigoBarra, nombreCategoria, marca, descripcion, stock);
        this.idProveedor = idProveedor;
        this.precioCompra = precioCompra;
    }

    getAll() {
        return `ProductoProveedor[codigoBarra:${this.codigoBarra}, nombreCategoria:${this.nombreCategoria}, marca:${this.marca}, description:${this.description}, stock:${this.stock}, precioCompra:${this.precioCompra}]`;
    }

    getPrecioCompra() {
        return this.precioCompra;
    }
    
    getCodigoBarra(){
        return this.codigoBarra
    }
}

productoSchema.loadClass(ProductoProveedor);
module.exports = model('ProductoProveedor', productoSchema);