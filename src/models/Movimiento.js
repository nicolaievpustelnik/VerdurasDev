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

    ingresarProveedor(provedorAux) {

        pudoAgregarProovedor = false;

        if (provedorAux) {
            this.proveedor = new Proveedor(provedorAux);
            pudoAgregarProovedor = true;
        }

        return pudoAgregarProovedor;
    }

    ingresarCliente(clienteAux) {
        this.cliente = new Cliente(clienteAux);
    }

    ingresarProducto(ticketAux) {
        this.ticket = new Ticket(ticketAux);
    }
}

movimientoSchema.loadClass(Movimiento);
module.exports = model('Movimiento', movimientoSchema);