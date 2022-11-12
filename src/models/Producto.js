class Producto {

    constructor(idProducto, codigoBarra, nombreCategoria, marca, descripcion, stock) {
        this.idProducto = idProducto;
        this.codigoBarra = codigoBarra;
        this.nombreCategoria = nombreCategoria;
        this.marca = marca;
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