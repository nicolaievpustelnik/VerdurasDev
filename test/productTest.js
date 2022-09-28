const chai = require('chai');
const should = chai.should();
const assert = chai.assert;
const expect = chai.expect;

const ProductoSucursal = require('../src/models/ProductSucursal')

describe("ProductSucursal", () => {
    describe("atributos", () => {
        it('debe tener un atributo ID', () => {
            const unProd = new ProductoSucursal(4, 112, "Frutas", "Frut", "Melon", 200, 1, 250,)
            const atributosDelObjetoProducto = Object.keys(unProd)
            assert.equal(atributosDelObjetoProducto[0],'idProd')
        })
    })
})