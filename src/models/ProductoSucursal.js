const { model } = require('mongoose');

const Producto = require('./Producto');
const productoSchema = require('./schemas/ProductoSchema');

class ProductoSucursal extends Producto {

    constructor(idProducto, codigoBarra, nombreCategoria, marca, descripcion, stock, idSucursal, precioVenta) {
        super(idProducto, codigoBarra, nombreCategoria, marca, descripcion, stock)
        this.idSucursal = idSucursal
        this.precioVenta = precioVenta
    }

    getAll() {
        return `ProductoSucursal[idProducto:${this.idProducto},codigoBarra:${this.codigoBarra}, nombreCategoria:${this.nombreCategoria}, marca:${this.marca}, description:${this.description}, stock:${this.stock}, idSucursal:${this.idSucursal}, precioVenta:${this.precioVenta}]`;
    }

    getPrecioVenta() {
        return this.precioVenta;
    }

    actualizarStock(cant) {
        this.stock += cant;
    }

    getPrecio() {
        this.precioVenta;
    }
    
    getCodigoBarra(){
        return this.codigoBarra
    }

    getIdProducto(){
        return this.idProducto
    }
}

productoSchema.loadClass(ProductoSucursal);
module.exports = model('ProductoSucursal', productoSchema);