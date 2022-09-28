const {model} = require ('mongoose');

const cliente = require("./Cliente")
const ticket = require ("./Ticket")
const proveedor = require ("./Proveedor")

const movimientosSchema = require("./schemas/movimientosSchema");

class Movimiento{
    constructor(idMovimiento,monto,fecha){
        this.idMovimiento= idMovimiento;
        this.monto=monto;
        this.fecha=fecha;
        this.proveedor={};
        this.cliente={};
        this.ticket={};
    }
    setProveedor(provedorAux) {
        this.proveedor= new Proveedor(provedorAux)
            
    }
    setCliente(clienteAux) {
        this.cliente = new Cliente(clienteAux)
    }
    setProduct(ticketAux) {
        this.ticket = new ticket(ticketAux)
    }
}

movimientosSchema.loadClass(Movimiento);
module.exports=model('Movimiento',movimientosSchema);