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
    ubicacion: 'Mendoza 1544, Ciudad Autonoma de Buenos Aires'
})

describe("Sucursal", () => {
    
    describe('Alta de empleado', () => {
        it('#agregarUsuario():boolean', () => {
            let unEmpleado = new Empleado({
                legajo: 123456,
                nombre: "Nicolaiev",
                apellido: "Brito",
                email: "nicolaievbrito@gmail.com",
                password: "12345",
                sucursal: "2",
                tipoUsuario: "Empleado"
            });
            let empleadoIngresado = unaSucursal.agregarUsuario(unEmpleado);
            assert.equal(empleadoIngresado, true);
        });
    });

    describe('Buscar Empleado por Legajo', () => {
        it('#buscarEmpleado(legajo):Empleado', () => {
            let unEmpleado = unaSucursal.buscarEmpleado(123456);
            expect(unEmpleado).to.be.an.instanceof(Empleado);
        });
    });

    describe('Asignar Rol', () => {

        it('#AsignarRol(legajo,unRol):Rol', () => {
            let rolesValidos = unaSucursal.asignarRol(123456, nomRol);

            expect(rolesValidos).to.equal(true);
        }); 
    });

    describe('Validar rol existente', () => {

        /* it('validarRol:boolean', () => {
            let unEmpleado = new Empleado({
                firstName: "Delmer", lastName: "Rodriguez", email: "jindrg@gmail.com", password: "12345", sucursal: "2"})

            let rolesValidos = unaSucursal.validarRol(unEmpleado.rol);

            expect(rolesValidos).to.equal(true);
        }); */
    });

    describe('Recibir producto stock', () => {

        it('#buscarProducto(scanner):ProductSucursal', () => {
           
            /* const unaSucursal = new Sucursal(1, 'Sucursal 1', 'Monroe 1254,CABA')
            let producto = new ProductoSucursal(3, 111, "Frutas", "Ecuador", "Banana", 'kg', 100, 2, 155);
            unaSucursal.agregarProducto(producto) */

            /*   let prodSuc = new ProductoSucursal({
                  idProducto: 3,
                  codigoBarra: 111,
                  nombreCategoria: "Frutas",
                  marca: "Ecuador",
                  descripcion: "Banana",
                  stock: 100,
                  idSucursal: 2,
                  precioVenta: 155,
              }); */

            // let unproducto = unaSucursal.productosDeSucursal.push(prodSuc)

            //expect(producto).to.be.an.instanceof(ProductoSucursal);

            /* assert.equal(productoRecibido, true);
            expect(prodSuc).to.be.an.instanceof(ProductoSucursal);
            expect(productoEnSucursal).to.equal(1); */
        });
    });

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

});
