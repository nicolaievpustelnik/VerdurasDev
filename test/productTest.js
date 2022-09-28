const chai = require('chai');
const assert = chai.assert;
const expect = chai.expect

let Product = require('../src/models/Product.js');
let ProductSucursal = require('../src/models/ProductSucursal.js')
const prodSuc = new ProductSucursal({ idProd: 3, barCode: 111, nomCat: "Frutas", marca: "Ecuador", description: "Banana", stock: 100, idSuc: 2, salePrice: 155 })

describe("ProductoDeSucursal", () => {
    describe("Registros", () => {
        it('debe tener cargado un registro en ID', () => {
            assert.equal(prodSuc.idProd, 3)
        })

        it('debe tener cargado un registro en BARCODE', () => {
            assert.equal(prodSuc.barCode, 111)
        })

        it('debe tener cargado un registro en NOMBRE_DE_CATEGORIA', () => {
            assert.equal(prodSuc.nomCat, 'Frutas')
        })

        it('debe tener cargado un registro en MARCA', () => {
            assert.equal(prodSuc.marca, 'Ecuador')
        })

        it('debe tener cargado un registro en DESCRIPCION', () => {
            assert.equal(prodSuc.description, 'Banana')
        })

        it('debe tener cargado un registro en STOCK', () => {
            assert.equal(prodSuc.stock, 100)
        })

        it('debe tener cargado un registro en ID_SUC', () => {
            assert.equal(prodSuc.idSuc, 2)
        })

        it('debe tener cargado un registro en PRECIO_DE_LISTA', () => {
            assert.equal(prodSuc.salePrice, 155)
        })
    })
})

const prodSu = new Product(3, 111, "Frutas", "Ecuador", "Banana", 100, 2, 155)
const atributosDelObjetoProduct = Object.keys(prodSu)
describe("Product", () => {
    describe("atributos", () => {
        it('debe tener un atributo ID', () => {
            assert.equal(atributosDelObjetoProduct[0], 'idProd')
        })

        it('debe tener un atributo BARCODE', () => {
            assert.equal(atributosDelObjetoProduct[1], 'barCode')
        })

        it('debe tener un atributo NOMBRE_CATEGORIA', () => {
            assert.equal(atributosDelObjetoProduct[2], 'nomCat')
        })

        it('debe tener un atributo MARCA', () => {
            assert.equal(atributosDelObjetoProduct[3], 'marca')
        })

        it('debe tener un atributo DESCRIPCION', () => {
            assert.equal(atributosDelObjetoProduct[4], 'description')
        })

        it('debe tener un atributo STOCK', () => {
            assert.equal(atributosDelObjetoProduct[5], 'stock')
        })
    })
}) 


describe("Product", function() {
    describe("Stock", function() {
    it("Stock no tiene que ser negativo ", function() {
    result   = prodSu.validateStatusStock(1)
    console.log(result)
   expect([0,1]).to.include(result) 
    
    }); 
    });
   });