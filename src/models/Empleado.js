const { model } = require('mongoose');

const Usuario = require('./Usuario');
const usuarioSchema = require('./schemas/UsuarioSchema');
const rolEnum = require('./Rol');
const Admin = require('./Admin');

class Empleado extends Usuario {

    constructor(nombre, apellido, email, password, sucursal, tipoUsuario, rol) {
        super(nombre, apellido, email, password);
        this.sucursal = sucursal;
        this.tipoUsuario = tipoUsuario;
        this.rol = rol;
    }

    getAll() {
        return `Empleado[nombre:${this.nombre}, apellido:${this.apellido}, email:${this.email}, password:${this.password}, sucursal:${this.sucursal}, rol:${this.rol}]`;
    }

    getRol() {
        return this.rol
    }

    verificarSiTieneRol(rol) {

        let rolValido = false;

        if (rol == rolEnum.RECEPCIONISTA.name || Usuario instanceof Admin) {
            rolValido = true;
        } else {
            //throw new Error('Intenta ejecutar una tarea no autorizada');
        }

        return rolValido;
    }


}
usuarioSchema.loadClass(Empleado);
module.exports = model('Empleado', usuarioSchema);