
const { model } = require('mongoose');

const Usuario = require('./Usuario');
const usuarioSchema = require('./schemas/UsuarioSchema');


class Admin extends Usuario {

    constructor(nombre, apellido, email, password, sucursal, tipoUsuario) {
        super(nombre, apellido, email, password);
        this.sucursal = sucursal;
        this.tipoUsuario = tipoUsuario;
    }

    getAll() {
        return `Admin[id:${this.id}, nombre:${this.nombre}, apellido:${this.apellido}, email:${this.email}, password:${this.password}, sucursal:${this.sucursal}]`;
    }

    getNombreCompleto() {
        return `${this.nombre} ${this.apellido}`;
    }

    borrarUsuario(local, idUsuario) {

        if (!local || Object.keys(local).length === 0) {
            throw new Error('Local invalido');
        }

        if (idUsuario < 1 || !idUsuario) {
            throw new Error('IdUsuario invalido');
        }

        return true;
    }

    crearUsuario(local, usuario) {

        if (!local || Object.keys(local).length === 0) {
            throw new Error('Local invalido');
        }

        if (!usuario || Object.keys(usuario).length === 0) {
            throw new Error('Usuario invalido');
        }

        return true;
    }
}

usuarioSchema.loadClass(Admin);
module.exports = model("Admin", usuarioSchema);
