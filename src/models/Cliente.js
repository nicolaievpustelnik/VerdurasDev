const { model } = require('mongoose');

const clienteSchema = require("./schemas/ClienteSchema");

class Cliente {

    constructor(dniCliente) {
        this.dniCliente = dniCliente;
    }

    getAll() {
        return `Cliente[dniCliente:${this.dniCliente}]`;
    }

    getId() {
        return this.dniCliente;
    }
}
clienteSchema.loadClass(Cliente);
module.exports = model('Cliente', clienteSchema);