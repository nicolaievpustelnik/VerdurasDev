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

describe('#Productos()', () => {
    it('tiene un listado de productos', () => {
        expect(unaSucursal.listOfProducts()).to.be.an('array')
    })
    it('tiene un listado de usuarios', () => {
        expect(unaSucursal.listOfUsuarios()).to.be.an('array')
    })
})

describe('#addProduct()', () => {
    it('Agrega un producto a Sucursal', () => {
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

    it('Agrega un producto De Proveedor', () => {
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
})

describe('#addUser()', () => {
    it('Agrega un Empleado a Sucursal', () => {
        const unEmpleado = new Employee({
            firstName: "Nicolaiev",
            lastName: "Brito" ,
            email: "nicolaievbrito@gmail.com",
            password: "12345",
            sucursal: "2"
        })
        unaSucursal.addUser(unEmpleado)
        expect(unaSucursal.listOfUsuarios().length).to.equal(1)
    })
})