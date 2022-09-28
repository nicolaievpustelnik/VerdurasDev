class Product {

    constructor(idProd, barCode, nomCat, marca, description, stock) {

        this.idProd = idProd;
        this.barCode = barCode;
        this.nomCat = nomCat;
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

    getStock(){
        return  this.stock
    }
}

module.exports = Product;