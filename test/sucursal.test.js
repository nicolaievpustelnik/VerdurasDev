const chai = require('chai');
const assert = chai.assert;
const expect = chai.expect

const Sucursal = require('../src/Sucursal.js');
const ProductoSucursal = require('../src/models/ProductoSucursal.js')
const Empleado = require('../src/models/Empleado.js');
const Rol = require('../src/models/Rol.js');

const unaSucursal = new Sucursal({
    idSucursal: 1,
    nombreSucursal: 'Local 1',
    ubicacion: 'Mendoza 1544, Ciudad Autonoma de Buenos Aires',
    usuarios: [],
    productos: []
})

describe("Sucursal", () => {

    describe('Productos en sucursal', () => {

        it('listaDeProductosEnSucursal():Array', () => {

            let producto = new ProductoSucursal({
                idProducto: 3,
                codigoBarra: 111,
                nombreCategoria: "Frutas",
                marca: "Ecuador",
                descripcion: "Banana",
                stock: 100,
                idSucursal: 2,
                precioVenta: 155,
            });
            unaSucursal.agregarProducto(producto);

            let productos = unaSucursal.listaDeProductosEnSucursal();

            expect(productos.length > 0).to.equal(true);
            expect(productos).to.be.an('array')
        });
    });

    describe('Lista de usuarios', () => {

        it('listaDeUsuarios:Array', () => {

            let unEmpleado = new Empleado({
                firstName: "Nicolaiev",
                lastName: "Brito",
                email: "nicolaievbrito@gmail.com",
                password: "12345",
                sucursal: "2",
                tipoUsuario: "Empleado",
                rol: [Rol.CAJERO, Rol.ORGANIZADOR]
            });
            unaSucursal.agregarUsuario(unEmpleado);

            let usuarios = unaSucursal.listaDeUsuarios();

            expect(usuarios.length > 0).to.equal(true);
            expect(usuarios).to.be.an('array')
        });
    });

    describe('Validar rol existente', () => {

        it('validarRol:boolean', () => {
            let unEmpleado = new Empleado({
                firstName: "Nicolaiev", lastName: "Brito", email: "nicolaievbrito@gmail.com", password: "12345", sucursal: "2", tipoUsuario: "Empleado",
                rol: [Rol.CAJERO, Rol.ORGANIZADOR]
            })

            let rolesValidos = unaSucursal.validarRol(unEmpleado.rol);

            expect(rolesValidos).to.equal(true);
        });
    });

    describe('Alta de empleado', () => {

        it('agregarUsuario():boolean', () => {
            let unEmpleado = new Empleado({
                firstName: "Nicolaiev",
                lastName: "Brito",
                email: "nicolaievbrito@gmail.com",
                password: "12345",
                sucursal: "2",
                tipoUsuario: "Empleado",
                rol: [Rol.CAJERO, Rol.ORGANIZADOR]
            });

            let validarRol = unaSucursal.validarRol(unEmpleado.rol);
            let empleadoIngresado = unaSucursal.agregarUsuario(unEmpleado);

            assert.equal(validarRol, true);
            assert.equal(empleadoIngresado, true);
            expect(unEmpleado).to.be.an.instanceof(Empleado);
        });
    });

    describe('Recibir producto stock', () => {

        it('recibirProductoStock:boolean', () => {
            let prodSuc = new ProductoSucursal({
                idProducto: 3,
                codigoBarra: 111,
                nombreCategoria: "Frutas",
                marca: "Ecuador",
                descripcion: "Banana",
                stock: 100,
                idSucursal: 2,
                precioVenta: 155,
            });

            let productoRecibido = unaSucursal.recibirProductoStock(prodSuc);
            let productoEnSucursal = unaSucursal.listaDeProductosEnSucursal().length;

            assert.equal(productoRecibido, true);
            expect(prodSuc).to.be.an.instanceof(ProductoSucursal);
            expect(productoEnSucursal).to.equal(1);
        });
    });
});