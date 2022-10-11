const chai = require('chai');
const assert = chai.assert;
const expect = chai.expect

let Sucursal = require('../src/models/Sucursal.js');
let ProductSucursal = require('../src/models/ProductSucursal.js')
let ProductProvider = require('../src/models/ProductProvider.js')
let Employee = require('../src/models/Employee.js')

const unaSucursal = new Sucursal({
    idSuc: 1,
    nomSuc: 'Local 1',
    ubicacion: 'Mendoza 1544, Ciudad Autonoma de Buenos Aires',
    users: [],
    products: []
})
describe("Sucursal", () => {
    describe('Arrays', () => {
        it('Debe tener un listado de PRODUCTOS', () => {
            expect(unaSucursal.listOfProducts()).to.be.an('array')
        })
        it('Debe tener un listado de USUARIOS', () => {
            expect(unaSucursal.listOfUsuarios()).to.be.an('array')
        })
    })

    describe('#methods', () => {
        it('Debe tener metodo AGREGAR PRODUCTOS SUCURSAL', () => {
            let prodSuc = new ProductSucursal({
                idProd: 3,
                barCode: 111,
                nomCat: "Frutas",
                marca: "Ecuador",
                description: "Banana",
                stock: 100,
                idSuc: 2,
                salePrice: 155,
            })
            unaSucursal.addProduct(prodSuc)
            expect(unaSucursal.listOfProducts().length).to.equal(1)
        })

        it('Debe tener metodo AGREGAR PRODUCTOS PROVEEDOR', () => {
            let prodProv = new ProductProvider({
                idProd: 11,
                barCode: 221,
                nomCat: "Frutas",
                marca: "Prov1",
                description: "Banana",
                stock: 1500,
                idProv: 1,
                purchasePrice: 30,
            })
            unaSucursal.addProduct(prodProv)
            expect(unaSucursal.listOfProducts().length).to.equal(2)
        })

        it('Debe tener metodo AGREGAR EMPLEADO', () => {
            const unEmpleado = new Employee({
                firstName: "Nicolaiev",
                lastName: "Brito",
                email: "nicolaievbrito@gmail.com",
                password: "12345",
                sucursal: "2"
            })
            unaSucursal.addUser(unEmpleado)
            expect(unaSucursal.listOfUsuarios().length).to.equal(1)
        })
    })
})

