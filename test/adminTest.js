const chai = require('chai');
const should = chai.should();
const assert = chai.assert;
const expect = chai.expect;

let Admin = require('../src/models/Admin');
let Local = require('../src/models/Sucursal');

describe("Admin", function () {

    describe("Method full name", function () {

        let newAdmin = new Admin({ firstName: "Nicolaiev", lastName: "Brito", email: "nicolaievbrito@gmail.com", password: "12345", sucursal: "1" });

        let fullName = newAdmin.getFullName();

        it("Get full name", (function () {
            assert.equal(fullName, "Nicolaiev Brito");
        }));

        it("The result is a String", (function () {
            assert.typeOf(fullName, "String");
        }));
    });

    describe("Method delete user", function () {

        let newAdmin = new Admin({ firstName: "Nicolaiev", lastName: "Brito", email: "nicolaievbrito@gmail.com", password: "12345", sucursal: "1" });

        //let local = new Local({ idLocal: 1, nomSuc: "suc1", ubicacion: "Belgrano" });
        let local = new Object;

        let userDeleted = newAdmin.deleteUser(local, 1);

        it("Delete user", (function () {
            assert.equal(userDeleted, true);
        }));

        it("The result is a boolean", (function () {
            assert.typeOf(userDeleted, "boolean");
        }));

        it("Assert catch exception local", (function () {
            assert.throws(() => newAdmin.deleteUser(null, 1), Error, "Local invalido");
        }));
    });

});

