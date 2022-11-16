const { model } = require('mongoose');

const ProductoProveedor = require("../models/ProductoProveedor")

const proveedorSchema = require("./schemas/ProveedorSchema")

class Proveedor {

    constructor(cuilProveedor, nombreProveedor) {
        this.cuilProveedor = cuilProveedor;
        this.nombreProveedor = nombreProveedor;
    }

    agregarProductoAProveedor(productAux) {
        this.productosProveedor.push(productAux)
    }

    getPrecioCompra(scanner) {
        let prodProv = this.productosProveedor.find(p => p.codigoBarra === scanner);
        let monto = prodProv.getPrecioCompra();
        return monto;

    }

    getCuil() {
        return this.cuilProveedor;
    }

    getAll() {
        return `Proveedor[cuilProveedor:${this.cuilProveedor}, nombreProveedor:${this.nombreProveedor}, productosProveedor:${this.productosProveedor}]`
    }

    /* getProductos() {
        return this.productosProveedor
    } */

    /* getPrecioCompra(scanner){
        return this.productosProveedor.find(p => p.scanner == scanner);
     } */

}
proveedorSchema.loadClass(Proveedor);
module.exports = model('Proveedor', proveedorSchema);