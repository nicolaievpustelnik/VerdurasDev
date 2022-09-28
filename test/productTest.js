const chai = require('chai');
const should = chai.should();
const assert = chai.assert;
const expect = chai.expect;

let ProductSucursal = require('../src/models/ProductSucursal')


describe("ProductSucursal", () => {
    describe("atributos", () => {
        it('debe tener un atributo ID', () => {

            const prodSuc = new ProductSucursal({ idProd: 4, barCode: 112, nomCat: "Frutas", marca: "Frut", descripcion: "Melon", stock: 200, idSuc: 1, salePrice: 250 });
            //const atributosDelObjetoProduct = Object.keys(prodSuc)
            //console.log(Object.keys(prodSuc))
            //assert.equal(atributosDelObjetoProduct[0],'idProd')
        })

    })
})