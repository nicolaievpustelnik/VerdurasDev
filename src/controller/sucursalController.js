const Product = require('../models/Product');
const Sucursal = require('../models/Sucursal');
const sucursalSchema = require('../models/SucursalSchema');

const newSucursal = new Sucursal({
    idSuc: 1,
    nomSuc: 'Local 1',
    ubicacion: 'Mendoza 1544, Ciudad Autonoma de Buenos Aires',
    users: [],
    products: []
 
});
console.log(newSucursal)
console.log('------------------------------------------')
console.log(newSucursal.getAll())

