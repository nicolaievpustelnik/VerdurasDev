const chai = require('chai');
const should = chai.should();
const assert = chai.assert;
const expect = chai.expect;

let Product = require('../src/models/ProductSucursal')


 describe("ProductSucursal", () => {
    describe("atributos", () => {
        it('debe tener un atributo ID', () => {
            const prodSuc = new Product( 4, 112, "Frutas", "Frut", "Melon", 200,  1, 250,)
            //const atributosDelObjetoProduct = Object.keys(prodSuc)
            console.log(Object.keys(prodSuc))
            //assert.equal(atributosDelObjetoProduct[0],'idProd')
        })
        
    })
 })