const chai = require('chai');
const should = chai.should();
const assert = chai.assert;
const expect = chai.expect;

let Admin = require('../src/models/Admin');

describe("Admin", function () {

    const newAdmin = new Admin({ firstName: "Nicolaiev", lastName: "Brito", email: "nicolaievbrito@gmail.com", password: "12345", sucursal: "1" });

    describe("Method full name", function () {

        it("Get full name", (function () {
            let fullName = newAdmin.getFullName();
            assert.equal(fullName, "Nicolaiev Brito");
        }));

        it("The result is a String", (function () {
            let fullName = newAdmin.getFullName();
            assert.typeOf(fullName, "String");
        }));
    });

    describe("Method delete user", function () {

        it("Delete user", (function () {
            let user = newAdmin.deleteUser();
            assert.equal(user, true);
        }));

        it("The result is a boolean", (function () {
            let user = newAdmin.deleteUser();
            assert.typeOf(user, "boolean");
        }));
    });

});

