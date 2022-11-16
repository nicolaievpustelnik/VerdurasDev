const chai = require('chai');
const assert = chai.assert;
const expect = chai.expect

let Producto = require('../src/repository/Producto.js');
let ProductoSucursal = require('../src/repository/ProductoSucursal.js');

const prodSuc = new ProductoSucursal({ idProducto: 3, codigoBarra: 111, nombreCategoria: "Frutas", marca: "Ecuador", descripcion: "Banana", stock: 100, idSucursal: 2, precioVenta: 155 })

describe("ProductoDeSucursal", () => {
    describe("tipo de Datos", () => {
        it('Debe ser Number el ID', () => {
            assert.typeOf(prodSuc.idProducto, "Number");
        })

        it('Debe ser Number  codigoBarra', () => {
            assert.typeOf(prodSuc.codigoBarra, "Number")
        })

        it('debe ser String NOMBRE_DE_CATEGORIA', () => {
            assert.typeOf(prodSuc.nombreCategoria, 'String')
        })

        it('debe ser String  MARCA', () => {
            assert.typeOf(prodSuc.marca, 'String')
        })

        it('debe ser String  DESCRIPCION', () => {
            assert.typeOf(prodSuc.descripcion, 'String')
        })

        it('debe ser Number STOCK', () => {
            assert.typeOf(prodSuc.stock, 'Number')
        })

        it('debe ser Number ID_SUC', () => {
            assert.typeOf(prodSuc.idSucursal, 'Number')
        })

        it('debe ser Number PRECIO_DE_LISTA', () => {
            assert.typeOf(prodSuc.precioVenta, 'Number')
        })
    })

    const prodSu = new Producto(3, 111, "Frutas", "Ecuador", "Banana", 100, 2, 155)
    const atributosDelObjetoProduct = Object.keys(prodSu)
    describe("atributos", () => {
        it('debe tener un atributo ID', () => {
            assert.equal(atributosDelObjetoProduct[0], 'idProducto')
        })

        it('debe tener un atributo codigoBarra', () => {
            assert.equal(atributosDelObjetoProduct[1], 'codigoBarra')
        })

        it('debe tener un atributo NOMBRE_CATEGORIA', () => {
            assert.equal(atributosDelObjetoProduct[2], 'nombreCategoria')
        })

        it('debe tener un atributo MARCA', () => {
            assert.equal(atributosDelObjetoProduct[3], 'marca')
        })

        it('debe tener un atributo DESCRIPCION', () => {
            assert.equal(atributosDelObjetoProduct[4], 'descripcion')
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
                expect(prodSuc).to.have.property('idProducto').with.equal(3)
                expect(prodSuc).to.have.property('codigoBarra').with.equal(111)
                expect(prodSuc).to.have.property('nombreCategoria').with.equal("Frutas",)
                expect(prodSuc).to.have.property('marca').with.equal("Ecuador")
                expect(prodSuc).to.have.property('descripcion').with.equal("Banana")
                expect(prodSuc).to.have.property('stock').with.equal(100)
                expect(prodSuc).to.have.property('idSucursal').with.equal(2)
                expect(prodSuc).to.have.property('precioVenta').with.equal(155)
            })
        })

        describe("con datos inválidos", () => {
            it("impide la creación", () => {
                const unProducto = () => {
                    const productErroneo = new ProductoSucursal("2039")
                }
                expect(unProducto).to.throw(Error)
            })

        })

        describe("Stock", function () {
            it("inicializado mayor a 0", function () {
                result = prodSu.validateStatusStock(1)
                expect([0, 1]).to.include(result)
            })
        })
    })
})

