class Producto {

    constructor(idProducto, codigoBarra, nombreCategoria, descripcion, stock) {
        this.idProducto = idProducto;
        this.codigoBarra = codigoBarra;
        this.nombreCategoria = nombreCategoria;
        this.descripcion = descripcion;
        this.stock = stock;
    }

    getDescripcion(){
        return this.codigoBarra + " " + this.descripcion;
    }
    validateStatusStock(stock) {
        if (stock === 0) {
            return 0;
        } else if (stock > 0) {
            return 1;
        } else {
            return 2;
        }
    }

    getStock() {
        return this.stock;
    }
    
}

module.exports = Producto;