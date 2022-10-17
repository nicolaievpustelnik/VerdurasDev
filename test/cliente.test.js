const chai = require('chai');
const should = chai.should();
const assert = chai.assert;
const expect = chai.expect;

const Cliente = require('../src/models/Cliente');

describe("Cliente", function () {
    describe("Method id cliente", function () {
        let newCliente = new Cliente({ idCliente: 123 })

        let id = newCliente.getId();

        it("Get id", (function () {
            assert.equal(id, 123);
        }));

        it("The result is a number", (function () {
            assert.typeOf(id, "Number");
        }));
    })
})