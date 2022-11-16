const chai = require('chai');
const assert = chai.assert;

const Cliente = require('../src/repository/Cliente');

describe("Cliente", function () {
    describe("Method id cliente", function () {
        let newCliente = new Cliente({ dniCliente: 94807936 })

        let dniCliente = newCliente.getId();

        it("Get id", (function () {
            assert.equal(dniCliente, 94807936);
        }));

        it("The result is a number", (function () {
            assert.typeOf(dniCliente, "Number");
        }));
    })
})