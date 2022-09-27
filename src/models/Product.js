 class Product {

    constructor(idProd,barCode, nomCat, marca, description, stock) {
        if (new.target === Product) {
            throw new Error( 'this is an abstract class' );
        }
        this.idProd = idProd;
        this.barCode = barCode;
        this.nomCat = nomCat;
        this.marca = marca;
        this.description = description;
        this.stock = stock;
    }
    hayStock() {
        this.stock >0
    }
    stockNegativo() {
        this.stock <0
    }
}

module.exports = Product;