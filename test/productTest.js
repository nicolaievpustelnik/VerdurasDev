const chai = require('chai');
const assert = chai.assert;
const expect = chai.expect

let Product = require('../src/models/Product.js')

let ProductSuc = require('../src/models/ProductSucursal')
const prodSuc = new ProductSuc({ idProd: 3, barCode: 111, nomCat: "Frutas", marca: "Ecuador", description: "Banana", stock: 100, idSuc: 2, salePrice: 155 })

describe("ProductoDeSucursal", () => {
    describe("Registros", () => {
        it('debe tener los siguientes datos', () => {
            assert.equal(prodSuc.idProd, 3)
        })

        it('debe tener cargado un atributo BARCODE', () => {
            assert.equal(prodSuc.barCode, 111)
        })

        it('debe tener cargado un atributo NOMBRE_DE_CATEGORIA', () => {
            assert.equal(prodSuc.nomCat, 'Frutas')
        })

        it('debe tener cargado un atributo MARCA', () => {
            assert.equal(prodSuc.marca, 'Ecuador')
        })

        it('debe tener cargado un atributo DESCRIPCION', () => {
            assert.equal(prodSuc.description, 'Banana')
        })

        it('debe tener cargado un atributo STOCK', () => {
            assert.equal(prodSuc.stock, 100)
        })

        it('debe tener cargado un atributo ID_SUC', () => {
            assert.equal(prodSuc.idSuc, 2)
        })

        it('debe tener cargado un atributo PRECIO_DE_LISTA', () => {
            assert.equal(prodSuc.salePrice, 155)
        })
    })
})


const prod = new Product(3,111,"Frutas","Ecuador","Banana",100, 2,155)
const atributosDelObjetoProduct = Object.keys(prod)
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