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
    describe('Arrays', () => {
        it('Debe tener un listado de PRODUCTOS', () => {
            expect(unaSucursal.listaDeProductosEnSucursal()).to.be.an('array')
        })
        it('Debe tener un listado de EMPLEADOS', () => {
            expect(unaSucursal.listaDeUsuarios()).to.be.an('array')
        })
    })

    describe('#methods', () => {
        it('Debe tener metodo para poder VALIDAR si tiene el rol de recepcionista', () => {
            const unEmpleado = new Empleado({firstName: "Nicolaiev",lastName: "Brito",email: "nicolaievbrito@gmail.com",password: "12345",sucursal: "2"
            })
            })
            unaSucursal.validarRol(unEmpleado.)
            expect(unaSucursal.listaDeProductosEnSucursal().length).to.equal(1)
        })
        it('Debe tener metodo para poder RECEPCIONAR', () => {
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
            unaSucursal.recepcionarProducto(prodSuc)
            expect(unaSucursal.listaDeProductosEnSucursal().length).to.equal(1)
        })

        it('Debe tener metodo AGREGAR EMPLEADO', () => {
            const unEmpleado = new Empleado({
                firstName: "Nicolaiev",
                lastName: "Brito",
                email: "nicolaievbrito@gmail.com",
                password: "12345",
                sucursal: "2",
                rol: Rol.ORGANIZADOR.name
            })
            unaSucursal.agregarUsuario(unEmpleado)
            expect(unaSucursal.listaDeUsuarios().length).to.equal(1)
        })
    })

