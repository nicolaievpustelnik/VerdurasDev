const { model } = require('mongoose');

const movimientoSchema = require("./schemas/MovimientoSchema");

class Movimiento {

    constructor(cant, descripcionProducto, nombreProveedor, monto) {
        this.cant = cant;
        this.descripcionProducto = descripcionProducto;
        this.nombreProveedor = nombreProveedor;
        this.monto = monto;
        this.fecha = new Date().toLocaleString();
    }

    getAll() {
        return `Movimiento[monto:${this.monto}, Proveedor:${this.unEnte},Producto:${this.unProducto},Producto:${this.fecha}`;
    }

    mostrar() {
        return `[${this.fecha} Se recibio ${this.cant} kg de ${this.descripcionProducto} del Proveedor ${this.nombreProveedor} por un monto de ${this.monto} ]`
    }

    /* 
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
        } */
}

movimientoSchema.loadClass(Movimiento);
module.exports = model('Movimiento', movimientoSchema);