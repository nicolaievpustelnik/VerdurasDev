class Producto {

    constructor(idProducto, codigoBarra, nombreCategoria, marca, description, stock) {
        this.idProducto = idProducto;
        this.codigoBarra = codigoBarra;
        this.nombreCategoria = nombreCategoria;
        this.marca = marca;
        this.description = description;
        this.stock = stock;
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