const chai = require('chai');
const should = chai.should();
const assert = chai.assert;
const expect = chai.expect;

const Admin = require('../src/models/Admin');
const Sucursal = require('../src/models/Sucursal');

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

    // describe("Method delete user", function () {

    //     let newAdmin = new Admin({ firstName: "Nicolaiev", lastName: "Brito", email: "nicolaievbrito@gmail.com", password: "12345", sucursal: "1" });

    //     let Suc = new Sucursal({ idSuc: 1, nomSuc: "suc1", ubicacion: "Belgrano" });

    //     //let Suc = new Object;

    //     let userDeleted = newAdmin.deleteUser(Suc, 1);

    //     it("Delete user", (function () {
    //         assert.equal(userDeleted, true);
    //     }));

    //     it("The result is a boolean", (function () {
    //         assert.typeOf(userDeleted, "boolean");
    //     }));

    //     // it("Assert catch exception null Suc", (function () {
    //     //     assert.throws(() => newAdmin.deleteUser({}, 1), Error, "Local invalido");
    //     // }));

    //     it("Assert catch exception invalid number idUser", (function () {
    //         assert.throws(() => newAdmin.deleteUser(Suc, 0), Error, "IdUser invalido");
    //     }));

    //     it("Assert catch exception null idUser", (function () {
    //         assert.throws(() => newAdmin.deleteUser(Suc, null), Error, "IdUser invalido");
    //     }));
    // });

});

