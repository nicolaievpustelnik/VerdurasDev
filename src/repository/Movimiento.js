const { model } = require('mongoose');

const movimientoSchema = require("./schemas/MovimientoSchema");

class Movimiento {

    constructor(cant, descripcionProducto, nombreEnte, monto, fecha, tipo) {
        this.cant = cant;
        this.descripcionProducto = descripcionProducto;
        this.nombreEnte = nombreEnte;
        this.monto = monto;
        this.fecha = fecha;
        this.tipo = tipo;
    }

    getAll() {
        return `Movimiento[monto:${this.monto}, Proveedor:${this.unEnte},Producto:${this.unProducto},Producto:${this.fecha}`;
    }

    mostrar() {
        if (this.tipo === 'Compra') {
            return `[COMPRA-->${this.fecha} Se compró ${this.cant} kg de ${this.descripcionProducto} del Proveedor ${this.nombreEnte} por un monto de ${this.monto} ]`
        } else {
            return `[VENTA -->${this.fecha} Se vendió ${this.cant} kg de ${this.descripcionProducto} al Cliente ${this.nombreEnte} por un monto de ${this.monto} ]`
        }
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