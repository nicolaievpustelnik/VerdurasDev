const { model } = require('mongoose');

const Ticket = require("./Ticket");
const Cliente = require("./Cliente");
const Proveedor = require("./Proveedor");

const movimientoSchema = require("./schemas/MovimientoSchema");

class Movimiento {

    constructor(idMovimiento, monto, fecha) {
        this.idMovimiento = idMovimiento;
        this.monto = monto;
        this.fecha = fecha;
        this.proveedor = {};
        this.cliente = {};
        this.ticket = {};
    }

    setProveedor(provedorAux) {
        this.proveedor = new Proveedor(provedorAux);

    }

    setCliente(clienteAux) {
        this.cliente = new Cliente(clienteAux);
    }

    setProducto(ticketAux) {
        this.ticket = new Ticket(ticketAux);
    }
}

movimientoSchema.loadClass(Movimiento);
module.exports = model('Movimiento', movimientoSchema);