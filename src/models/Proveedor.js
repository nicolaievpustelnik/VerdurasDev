const { model } = require('mongoose');

const ProductoProveedor = require("../models/ProductoProveedor")

const proveedorSchema = require("../models/schemas/ProveedorSchema")

class Proveedor {

    constructor(idProveedor, nombreProveedor) {
        this.idProveedor = idProveedor;
        this.nombreProveedor = nombreProveedor;
        this.productosProveedor = [];
    }

    setProducto(productAux) {
        let p = new ProductoProveedor(productAux)
        this.productosProveedor.push(p)
    }

    getAll() {
        return `Proveedor[idProveedor:${this.idProveedor}, nombreProveedor:${this.nombreProveedor}, productosProveedor:${this.productosProveedor}]`
    }

    getProductos() {
        return this.productosProveedor
    }

    /* getPrecioCompra(scanner){
        return this.productosProveedor.find(p => p.scanner == scanner);
     } */

}
proveedorSchema, loadClass(Proveedor);
module.exports = model('Proveedor', proveedorSchema);