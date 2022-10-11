const chai = require('chai');
const assert = chai.assert;
const expect = chai.expect

let Product = require('../src/models/Product.js');
let ProductSucursal = require('../src/models/ProductSucursal.js')
const prodSuc = new ProductSucursal({ idProd: 3, barCode: 111, nomCat: "Frutas", marca: "Ecuador", description: "Banana", stock: 100, idSuc: 2, salePrice: 155 })

describe("ProductoDeSucursal", () => {
    describe("tipo de Datos", () => {
        it('Debe ser Number el ID', () => {
            assert.typeOf(prodSuc.idProd, "Number");
        })

        it('Debe ser Number  BARCODE', () => {
            assert.typeOf(prodSuc.barCode, "Number")
        })

        it('debe ser String NOMBRE_DE_CATEGORIA', () => {
            assert.typeOf(prodSuc.nomCat, 'String')
        })

        it('debe ser String  MARCA', () => {
            assert.typeOf(prodSuc.marca, 'String')
        })

        it('debe ser String  DESCRIPCION', () => {
            assert.typeOf(prodSuc.description, 'String')
        })

        it('debe ser Number STOCK', () => {
            assert.typeOf(prodSuc.stock, 'Number')
        })

        it('debe ser Number ID_SUC', () => {
            assert.typeOf(prodSuc.idSuc, 'Number')
        })

        it('debe ser Number PRECIO_DE_LISTA', () => {
            assert.typeOf(prodSuc.salePrice, 'Number')
        })
    })

    const prodSu = new Product(3, 111, "Frutas", "Ecuador", "Banana", 100, 2, 155)
    const atributosDelObjetoProduct = Object.keys(prodSu)
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

    describe("#methods", function () {
        describe("#getStock()", () => {
            it('debe tener un metodo que valide el Stock', () => {
                expect(prodSuc.validateStatusStock).to.be.a('function')
            })
        })
    })

    describe("#constructor()", () => {
        describe("con datos válidos", () => {
            it("Crea Producto de Sucursal", () => {
                expect(prodSuc).to.have.property('idProd').with.equal(3)
                expect(prodSuc).to.have.property('barCode').with.equal(111)
                expect(prodSuc).to.have.property('nomCat').with.equal("Frutas",)
                expect(prodSuc).to.have.property('marca').with.equal("Ecuador")
                expect(prodSuc).to.have.property('description').with.equal("Banana")
                expect(prodSuc).to.have.property('stock').with.equal(100)
                expect(prodSuc).to.have.property('idSuc').with.equal(2)
                expect(prodSuc).to.have.property('salePrice').with.equal(155)
            })
        })

        describe("con datos inválidos", () => {
            it("impide la creación", () => {
                const unProducto = () => {
                    const productErroneo = new ProductSucursal("2039")
                }
                expect(unProducto).to.throw(Error)
            })

        })

        describe("Stock", function () {
            it("Debe ser inicializado mayor a 0", function () {
                result = prodSu.validateStatusStock(1)
                expect([0, 1]).to.include(result)
            })
        })
    })
})





