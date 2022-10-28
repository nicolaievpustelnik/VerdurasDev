const { model } = require('mongoose');

const Usuario = require('./Usuario');
const userSchema = require('./schemas/UsuarioSchema');

class Empleado extends Usuario {

    constructor(nombre, apellido, email, password, sucursal, tipoUsuario, roles) {
        super(nombre, apellido, email, password);
        this.sucursal = sucursal;
        this.tipoUsuario = tipoUsuario;
        this.roles.push(roles);
    }

    getAll() {
        return `Empleado[nombre:${this.nombre}, apellido:${this.apellido}, email:${this.email}, password:${this.password}, sucursal:${this.sucursal}]`;
    }

    getNombreCompleto() {
        return `${this.nombre} ${this.apellido}`;
    }

    getRoles() {
        return this.roles
    }

}
userSchema.loadClass(Empleado);
module.exports = model('Usuario', userSchema);