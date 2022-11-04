const { Schema } = require('mongoose');

const sucursalSchema = new Schema({

    idSucursal: {
        type: Number,
        require: true
    },
    nombreSucursal: {
        type: String,
        require: true
    },
    ubicacion: {
        type: String,
        require: true,
    },
    productosDeSucursal: {
        type: [],
        require: false
    },
    proveedoresAutorizados: {
        type: [],
        require: false
    },
    compras: {
        type: [],
        require: false
    },
    ventas: {
        type: [],
        require: false
    },
    empleadosDeSucursal: {
        type: [],
        require: false
    },
    incidentesSospechosos: {
        type: [],
        require: false
    }


}, {
    timestamps: true
})

module.exports = sucursalSchema;