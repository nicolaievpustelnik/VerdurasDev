const { model } = require('mongoose');

const Usuario = require('./Usuario');
const usuarioSchema = require('./schemas/UsuarioSchema');
const rolEnum = require('./Rol');
const Admin = require('./Admin');


class Empleado extends Usuario {

    constructor(legajo, nombre, apellido, email, password, sucursal, tipoUsuario, rol) {
        super(legajo, nombre, apellido, email, password);
        this.sucursal = sucursal;
        this.tipoUsuario = tipoUsuario;
        this.rol = rol;
    }

    getLegajo() {
        return this.legajo;
    }

    getEmail() {
        return this.email;
    }

    getAll() {
        return `Empleado[nombre:${this.nombre}, apellido:${this.apellido}, email:${this.email}, password:${this.password}, sucursal:${this.sucursal}, rol:${this.rol}]`;
    }

    getRol() {
        return this.rol
    }
}
usuarioSchema.loadClass(Empleado);
module.exports = model('Usuario', usuarioSchema);