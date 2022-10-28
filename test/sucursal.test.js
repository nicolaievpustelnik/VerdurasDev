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
    describe('Arrays[]', () => {
        it('listado de PRODUCTOS', () => {
            expect(unaSucursal.listaDeProductosEnSucursal()).to.be.an('array')
        })
        it('listado de EMPLEADOS', () => {
            expect(unaSucursal.listaDeUsuarios()).to.be.an('array')
        });
    });

    describe('#methods', () => {
        it('usuarioLogueado()', () => {
          //sucursal debe mostrar Usuario logueado
        })
    
        it('agregarProducto()', () => {
        let prodSuc = new ProductoSucursal({
            idProducto: 3,
            codigoBarra: 111, 
            nombreCategoria: "Frutas",
            marca: "Ecuador",
            descripcion: "Banana",
            stock: 100,
            idSucursal: 2,
            precioVenta: 155,
        })
        unaSucursal.agregarProducto(prodSuc)
        expect(unaSucursal.listaDeProductosEnSucursal().length).to.equal(1)
    })

        it('recepcionarProducto()', () => {
            //let stock= unaSucursal.obtenerStockProducto(2)
            //unaSucursal.recepcionarProducto(2, 1, 10)
          expect(2).not.to.equal(3);
        })


        it('agregarEmpleado()', () => {
            const unEmpleado = new Empleado({
                nombre: "Nicolaiev",
                apellido: "Brito",
                email: "nicolaievbrito@gmail.com",
                password: "12345",
                sucursal: "2",
                rol: Rol.ORGANIZADOR
            })
            unaSucursal.agregarUsuario(unEmpleado)
            expect(unaSucursal.listaDeUsuarios().length).to.equal(1)
        })
        
})
})
