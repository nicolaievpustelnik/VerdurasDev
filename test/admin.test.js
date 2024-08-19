const chai = require('chai');
const should = chai.should();
const assert = chai.assert;
const expect = chai.expect;

const Admin = require('../src/repository/Admin');
const Empleado = require('../src/repository/Empleado');
const Sucursal = require('../src/SucursalRepository');
const Rol = require('../src/repository/Rol.js');

describe("Admin", function () {

    describe("Metodo nombre completo", function () {

        let newAdmin = new Admin({ legajo: "567890", nombre: "Nicolaiev", apellido: "Brito", email: "nico.brito@gmail.com", password: "12345", sucursal: "1" });

        let nombreCompleto = newAdmin.getNombreCompleto();

        it("Nombre completo", (function () {
            assert.equal(nombreCompleto, "Nicolaiev Brito");
        }));

        it("El resultado nombreCompleto es String", (function () {
            assert.typeOf(nombreCompleto, "String");
        }));
    });

    describe("Metodo borrar usuario", function () {

        let newAdmin = new Admin({ nombre: "Delmer", apellido: "Rodriguez", email: "delmer.rodriguez@gmail.com", password: "12345", sucursal: "1" });
        let Suc = new Sucursal({ idSucursal: 1, nombreSucursal: "Sucursal Central", ubicacion: "Centro" });

        let userDeleted = newAdmin.borrarUsuario(Suc, 2);

        it("Borrar usuario", (function () {
            assert.equal(userDeleted, true);
        }));

        it("El resultado borrar usuario es boolean", (function () {
            assert.typeOf(userDeleted, "boolean");
        }));

        it("Excepcion Sucursal vacia", (function () {
            assert.throws(() => newAdmin.borrarUsuario({}, 2), Error, "Local invalido");
        }));

        it("Excepcion Sucursal nula", (function () {
            assert.throws(() => newAdmin.borrarUsuario(null, 2), Error, "Local invalido");
        }));

        it("Excepcion idUsuario cero", (function () {
            assert.throws(() => newAdmin.borrarUsuario(Suc, 0), Error, "IdUsuario invalido");
        }));

        it("Excepcion idUsuario nulo", (function () {
            assert.throws(() => newAdmin.borrarUsuario(Suc, null), Error, "IdUsuario invalido");
        }));
    });

    describe("Metodo crear usuario", function () {

        let Suc = new Sucursal({ idSucursal: 1, nombreSucursal: "Sucursal Central", ubicacion: "Centro" });
        let newAdmin = new Admin({ nombre: "Debora", apellido: "Landa", email: "debora.landa@gmail.com", password: "54321", sucursal: "2" });
        let newEmpleado = new Empleado({ nombre: "Santiago", apellido: "Villagra", email: "santiago.villanueva@gmail.com", password: "54321", sucursal: "2", rol: Rol.ORGANIZADOR.name });

        let createAdmin = newAdmin.crearUsuario(Suc, newAdmin);
        let createEmpleado = newAdmin.crearUsuario(Suc, newEmpleado);

        it("Excepcion Sucursal vacia", (function () {
            assert.throws(() => newAdmin.crearUsuario({}, 1), Error, "Local invalido");
        }));

        it("Excepcion Sucursal nula", (function () {
            assert.throws(() => newAdmin.crearUsuario(null, 1), Error, "Local invalido");
        }));

        it("Excepcion Usuario vacio", (function () {
            assert.throws(() => newAdmin.crearUsuario(Suc, {}), Error, "Usuario invalido");
        }));

        it("Excepcion Usuario nulo", (function () {
            assert.throws(() => newAdmin.crearUsuario(Suc, null), Error, "Usuario invalido");
        }));

        describe("Usuario Admin", function () {

            it("Crear Admin", (function () {
                assert.equal(createAdmin, true);
            }));

            it("El resultado crearAdmin es boolean", (function () {
                assert.typeOf(createAdmin, "boolean");
            }));
        });

        describe("Usuario Empleado", function () {

            it("Crear Empleado", (function () {
                assert.equal(createEmpleado, true);
            }));

            it("El resultado crearEmpleado boolean", (function () {
                assert.typeOf(createEmpleado, "boolean");
            }));
        });

    });

});
