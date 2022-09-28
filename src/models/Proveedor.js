const{model} = require('mongoose');

const productProvider= require("./ProductProvider");
const { loadClass } = require('./schemas/movimientosSchema');

const proveedorSchema= require("./schemas/proveedorSchema")

class Proveedor{
    constructor(idProvedor,nombreProvedor){
        this.idProvedor=idProvedor;
        this.nombreProvedor=nombreProvedor;
        this.productProvider=[];
    }
    setProduct(productAux) {
        let p = new productProvider(productAux)
        this.productProvider.push(p)
    }
    getAll(){
        return `Proveedor[idProveedor:${this.idProvedor}, nombreProveedor:${this.nombreProvedor}, productProvider:${this.productProvider}]`
    }
    listOfProducts(){
        return this.productProvider
    }

}
proveedorSchema,loadClass(Proveedor);
module.exports= model('Proveedor',proveedorSchema);