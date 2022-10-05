const chai = require('chai');
const assert = chai.assert;
const expect = chai.expect

let Producto = require('../src/models/Producto.js');
let ProductoSucursal = require('../src/models/ProductoSucursal.js');

const prodSuc = new ProductoSucursal({ idProducto: 3, codigoBarra: 111, nombreCategoria: "Frutas", marca: "Ecuador", descripcion: "Banana", stock: 100, idSucursal: 2, precioVenta: 155 })

describe("ProductoDeSucursal", () => {
    describe("Registros", () => {

        it('debe tener cargado un registro en ID', () => {
            assert.equal(prodSuc.idProducto, 3)
        })

        it("debe tener cargado un registro en ID number", (function () {
            assert.typeOf(prodSuc.idProducto, "number");
        }));


        it('debe tener cargado un registro en codigoBarra', () => {
            assert.equal(prodSuc.codigoBarra, 111)
        })

        it('debe tener cargado un registro en NOMBRE_DE_CATEGORIA', () => {
            assert.equal(prodSuc.nombreCategoria, 'Frutas')
        })

        it('debe tener cargado un registro en MARCA', () => {
            assert.equal(prodSuc.marca, 'Ecuador')
        })

        it('debe tener cargado un registro en DESCRIPCION', () => {
            assert.equal(prodSuc.descripcion, 'Banana')
        })

        it('debe tener cargado un registro en STOCK', () => {
            assert.equal(prodSuc.stock, 100)
        })

        it('debe tener cargado un registro en ID_SUC', () => {
            assert.equal(prodSuc.idSucursal, 2)
        })

        it('debe tener cargado un registro en PRECIO_DE_LISTA', () => {
            assert.equal(prodSuc.precioVenta, 155)
        })
    })
})

const prodSu = new Producto(3, 111, "Frutas", "Ecuador", "Banana", 100, 2, 155)
const atributosDelObjetoProduct = Object.keys(prodSu)
describe("Producto", () => {
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
            assert.equal(atributosDelObjetoProduct[4], 'description')
        })

        it('debe tener un atributo STOCK', () => {
            assert.equal(atributosDelObjetoProduct[5], 'stock')
        })
    })
})


describe("Producto", function () {
    describe("Stock", function () {
        it("Stock no tiene que ser negativo ", function () {
            result = prodSu.validateStatusStock(1)
            expect([0, 1]).to.include(result)
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

    describe("#getStock()", () => {
        it('debe tener un metodo que valide el Stock', () => {
            expect(prodSuc.validateStatusStock).to.be.a('function')
        })
    })


})