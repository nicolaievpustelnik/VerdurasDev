

const chai = require('chai');
const assert = chai.assert;
const expect = chai.expect

const Sucursal = require('../src/SucursalRepository');
const ProductoSucursal = require('../src/repository/ProductoSucursal.js')
const Empleado = require('../src/repository/Empleado.js');
const rolEnum = require('../src/repository/Rol.js');
const Proveedor = require('../src/repository/Proveedor.js');
const Movimiento = require('../src/repository/Movimiento.js');
const ProductoProveedor = require('../src/repository/ProductoProveedor.js');

const unaSucursal = new Sucursal({
    idSucursal: 1,
    nombreSucursal: 'Local 1',
    ubicacion: 'Mendoza 1544, Ciudad Autonoma de Buenos Aires'
})

describe("Sucursal", () => {

    describe('Alta de empleado', () => {
        it('#agregarUsuario():boolean', () => {
            let unEmpleado = new Empleado({
                legajo: "123456",
                nombre: "Nicolaiev",
                apellido: "Brito",
                email: "nicolaievbrito@gmail.com",
                password: "12345",
                sucursal: "2",
                tipoUsuario: "Empleado",
                rol: rolEnum.ORGANIZADOR
            });
            let empleadoIngresado = unaSucursal.agregarUsuario(unEmpleado);
            assert.equal(empleadoIngresado, true);

        });
    });

    describe('Buscar Empleado por Legajo', () => {
        it('#buscarEmpleado(legajo):Empleado', () => {
            let unEmpleado = unaSucursal.buscarEmpleado("123456");
            expect(unEmpleado).to.be.an.instanceof(Empleado);
        });
    });

    describe('Verifica Rol', () => {
        it('#verificarRol(Empleado, rolEnum):boolean', () => {
            let unEmpleado = unaSucursal.buscarEmpleado("123456");
            let tieneRol = unaSucursal.verificarRol(unEmpleado, rolEnum.RECEPCIONISTA);
            expect(tieneRol).to.equal(true);
        });
    });

    describe('Alta Proveedor', () => {
        it('#agregarProveedor(unProveedor):Proveedor', () => {
            let unProveedor = new Proveedor({
                cuilProveedor: 1,
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
        it('#buscarProductoPorCodigoBarraSucursal(scanner): Producto', () => {
            let unProducto = unaSucursal.buscarProductoPorCodigoBarraSucursal(111);
            expect(unProducto).to.be.an.instanceof(ProductoSucursal);
        });
    });

    describe('Hay Stock', () => {
        it('#hayStock(Producto, cant): boolean', () => {
            let unProducto = unaSucursal.buscarProductoPorCodigoBarraSucursal(111);
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

    describe('Alta Movimiento', () => {
        it('#generarMovimiento(cant, unProducto, unEnte): Movimiento', () => {
            let unProducto = new ProductoProveedor({
                codigoBarra: 111,
                nombreCategoria: "Frutas",
                marca: "Ecuador",
                descripcion: "Banana",
                stock: 1000,
                precioCompra: 100,
            });
            let unEnte = unaSucursal.obtenerProveedor(1);
            unEnte.agregarProductoAProveedor(unProducto);
            let compra = unaSucursal.generarMovimiento(5, unProducto, unEnte);
            expect(compra).to.be.an.instanceof(Movimiento);
        });
    });

     describe('Actualizar stock', () => {
        it('#recepcionarProducto(idProveedor, scanner, cant):booelan', () => {
            let seRecepciono = unaSucursal.recepcionarProducto(1, 111, 50);
            assert.equal(seRecepciono, true);
        });

        it('#egresoProducto(dni, scanner, cant):boolean', () => {
            let unEmpleado1 = new Empleado({
                legajo: "654321",
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
            let productos = unaSucursal.listaDeProductosEnSucursal();
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

    describe('Movimientos en sucursal', () => {
        it('compras:Array', () => {
            let compras = unaSucursal.compras;
            expect(compras.length > 0).to.equal(true);
            expect(compras).to.be.an('array');
        });

        it('ventas:Array', () => {
            let ventas = unaSucursal.ventas;
            expect(ventas.length > 0).to.equal(true);
            expect(ventas).to.be.an('array');
        });

        it('incidentesSospechosos:Array', () => {
             unaSucursal.egresarProducto(94807936, 111, 10000000);
            expect(unaSucursal.incidentesSospechosos.length > 0).to.equal(true);
            expect(unaSucursal.incidentesSospechosos).to.be.an('array');
            console.log(unaSucursal.incidentesSospechosos)
        });
    }); 
});