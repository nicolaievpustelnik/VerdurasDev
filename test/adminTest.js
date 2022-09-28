const chai = require('chai');
const should = chai.should();
const assert = chai.assert;
const expect = chai.expect;

const Admin = require('../src/models/Admin');
const Employee = require('../src/models/Employee');
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

    describe("Method delete user", function () {

        let newAdmin = new Admin({ firstName: "Nicolaiev1", lastName: "Brito1", email: "nicolaievbrito1@gmail.com", password: "12345", sucursal: "1" });
        let Suc = new Sucursal({ idSuc: 1, nomSuc: "suc1", ubicacion: "Belgrano" });

        let userDeleted = newAdmin.deleteUser(Suc, 1);

        it("Delete user", (function () {
            assert.equal(userDeleted, true);
        }));

        it("The result is a boolean", (function () {
            assert.typeOf(userDeleted, "boolean");
        }));

        it("Assert catch exception empty Suc", (function () {
            assert.throws(() => newAdmin.deleteUser({}, 1), Error, "Local invalido");
        }));

        it("Assert catch exception null Suc", (function () {
            assert.throws(() => newAdmin.deleteUser(null, 1), Error, "Local invalido");
        }));

        it("Assert catch exception invalid number idUser", (function () {
            assert.throws(() => newAdmin.deleteUser(Suc, 0), Error, "IdUser invalido");
        }));

        it("Assert catch exception null idUser", (function () {
            assert.throws(() => newAdmin.deleteUser(Suc, null), Error, "IdUser invalido");
        }));
    });

    describe("Method create user", function () {

        let Suc = new Sucursal({ idSuc: 1, nomSuc: "suc1", ubicacion: "Belgrano" });
        let newAdmin = new Admin({ firstName: "Nicolaiev2", lastName: "Brito2", email: "nicolaievbrito2@gmail.com", password: "54321", sucursal: "2" });
        let newEmployee = new Employee({ firstName: "Nicolaiev2", lastName: "Brito2", email: "nicolaievbrito2@gmail.com", password: "54321", sucursal: "2" });

        let createAdmin = newAdmin.createUser(Suc, newAdmin);
        let createEmployee = newAdmin.createUser(Suc, newEmployee);

        it("Assert catch exception empty Suc", (function () {
            assert.throws(() => newAdmin.createUser({}, 1), Error, "Local invalido");
        }));

        it("Assert catch exception null Suc", (function () {
            assert.throws(() => newAdmin.createUser(null, 1), Error, "Local invalido");
        }));

        it("Assert catch exception invalid User", (function () {
            assert.throws(() => newAdmin.createUser(Suc, {}), Error, "User invalido");
        }));

        it("Assert catch exception null User", (function () {
            assert.throws(() => newAdmin.createUser(Suc, null), Error, "User invalido");
        }));

        describe("User Admin", function () {

            it("Create Admin", (function () {
                assert.equal(createAdmin, true);
            }));

            it("The result is a boolean Admin", (function () {
                assert.typeOf(createAdmin, "boolean");
            }));
        });

        describe("User Employee", function () {

            it("Create Employee", (function () {
                assert.equal(createEmployee, true);
            }));

            it("The result is a boolean Employee", (function () {
                assert.typeOf(createEmployee, "boolean");
            }));
        });

    });

});

