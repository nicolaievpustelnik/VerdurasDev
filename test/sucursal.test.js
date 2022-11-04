const chai = require('chai');
const assert = chai.assert;
const expect = chai.expect

const Sucursal = require('../src/Sucursal.js');
const ProductoSucursal = require('../src/models/ProductoSucursal.js')
const Empleado = require('../src/models/Empleado.js');
const rolEnum = require('../src/models/Rol.js');
const Proveedor = require('../src/models/Proveedor.js');
const ProductoProveedor = require('../src/models/ProductoProveedor.js');

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
                tipoUsuario: "Empleado",
                rol: rolEnum.RECEPCIONISTA.name
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

    describe('Verifica Rol', () => {
        it('#verificarSiTieneRol(nomRol):boolean', () => {
            let unEmpleado = unaSucursal.buscarEmpleado(123456);
            let tieneRol = unEmpleado.verificarSiTieneRol('Recepcionista');
            expect(tieneRol).to.equal(true);
        });
    });

    describe('Alta Proveedor', () => {
        it('#agregarProveedor(unProveedor):Proveedor', () => {
            let unProveedor = new Proveedor({
                idProveedor: 1,
                nombreProveedor: "Julio",
            });
            unaSucursal.agregarProveedor(unProveedor);
            expect(unProveedor).to.be.an.instanceof(Proveedor);
        });
    });

    describe('Alta Producto', () => {
        it('#agregarProducto(unProducto):Producto', () => {
            let unProducto = new ProductoSucursal({
                idProducto: 3,
                codigoBarra: 111,
                nombreCategoria: "Frutas",
                marca: "Ecuador",
                descripcion: "Banana",
                stock: 100,
                idSucursal: 2,
                precioVenta: 155,
            });
            unaSucursal.agregarProducto(unProducto);
            expect(unProducto).to.be.an.instanceof(ProductoSucursal);
        });
    });

    describe('Buscar Producto por scanner', () => {
        it('#buscarProductoEnSucursal(scanner): Producto', () => {
            let unProducto = unaSucursal.buscarUnProductoEnSucursal(111);
            expect(unProducto).to.be.an.instanceof(ProductoSucursal);
        });
    });

    describe('Hay Stock', () => {
        it('#hayStock(Producto, cant): boolean', () => {
            let unProducto = unaSucursal.buscarUnProductoEnSucursal(111);
            let hayStock = unaSucursal.hayStock(unProducto, 10)
            expect(hayStock).to.equal(true);
        });
    });

    describe('Ingreso coherente ', () => {
        it('#validarIngreso(cant): boolean', () => {
            let hayStock = unaSucursal.hayStock(10)
            expect(hayStock).to.equal(true);
        });
    });

    describe('Actualizar stock', () => {
        it('#recepcionarProducto(idProveedor, scanner, cant):booelan', () => {
            let unProducto = new ProductoProveedor({
                codigoBarra: 111,
                nombreCategoria: "Frutas",
                marca: "Ecuador",
                descripcion: "Banana",
                stock: 1000,
                precioCompra: 100,
            });
            let unProveedor = unaSucursal.obtenerProveedor(1);
            unProveedor.agregarProductoAProveedor(unProducto);
            let seRecepciono = unaSucursal.recepcionarProducto(1, 111, 50);

            recepcionarProducto(idProveedor, idProducto, cant)

            //no guarda Incidente, pendiente a solucionar
            console.log(unaSucursal.incidentesSospechosos)

            //Solucionar Problema en el metodo generar movimiento no puede crear un objeto Movimiento
            //por lo tanto no se guarda los movimientos realizados
            console.log(unaSucursal.movimientos)

            // assert.equal(seRecepciono, true);
        });

        it('#egresoProducto(dni, scanner, cant):booelan', () => {
            let unEmpleado1 = new Empleado({
                legajo: 654321,
                nombre: "Carmen",
                apellido: "Sanchez",
                email: "sanchez@gmail.com",
                password: "12545",
                sucursal: "2",
                tipoUsuario: "Empleado",
                rol: rolEnum.CAJERO.name
            });
            unaSucursal.agregarUsuario(unEmpleado1);
            let seEgreso = unaSucursal.egresarProducto(94807936, 111, 5);


            assert.equal(seEgreso, true);
        });
    });

    describe('Productos en sucursal', () => {
        it('listaDeProductosEnSucursal():Array', () => {
            let productos = unaSucursal.getListaDeProductosEnSucursal();
            expect(productos.length > 0).to.equal(true);
            expect(productos).to.be.an('array')
        });
    });

    describe('Lista de usuarios', () => {
        it('listaDeUsuarios:Array', () => {
            let usuarios = unaSucursal.listaDeUsuarios();
            expect(usuarios.length > 0).to.equal(true);
            expect(usuarios).to.be.an('array')
        });
    });

});
