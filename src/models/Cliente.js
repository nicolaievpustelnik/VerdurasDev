const { model } = require('mongoose');

const clienteSchema = require("./schemas/ClienteSchema");

class Cliente {

    constructor(idCliente) {
        this.idCliente = idCliente;
    }

    getAll() {
        return `Cliente[idCliente:${this.idCliente}]`;
    }

    getId() {
        return this.idCliente;
    }
}
clienteSchema.loadClass(Cliente);
module.exports = model('Cliente', clienteSchema);