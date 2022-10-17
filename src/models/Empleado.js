const { model } = require('mongoose');

const Usuario = require('./Usuario');
const userSchema = require('./schemas/UsuarioSchema');

class Empleado extends Usuario {

    constructor(nombre, apellido, email, password, sucursal, rol) {
        super(nombre, apellido, email, password, sucursal, rol);
        this.sucursal = sucursal;
        this.rol = rol;
    }

    getAll() {
        return `Empleado[nombre:${this.nombre}, apellido:${this.apellido}, email:${this.email}, password:${this.password}, sucursal:${this.sucursal}]`;
    }

    getNombreCompleto() {
        return `${this.nombre} ${this.apellido}`;
    }

}

userSchema.loadClass(Empleado);
module.exports = model('Empleado', userSchema);