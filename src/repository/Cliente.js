const { model } = require('mongoose');

const clienteSchema = require("../models/schemas/ClienteSchema");

class Cliente {

    constructor(dniCliente,nombreCliente) {
        this.dniCliente = dniCliente;
        this.nombreCliente = nombreCliente;
    }

    getAll() {
        return `Cliente[dniCliente:${this.dniCliente},nombreCliente:${this.dniCliente}]`;
    }

    getId() {
        return this.dniCliente;
    }
}
clienteSchema.loadClass(Cliente);
module.exports = model('Cliente', clienteSchema);