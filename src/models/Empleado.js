const { model } = require('mongoose');

const Usuario = require('./Usuario');
const userSchema = require('./schemas/UsuarioSchema');

class Empleado extends Usuario {

    constructor(nombre, apellido, email, password, sucursal, tipoUsuario, rol) {
        super(nombre, apellido, email, password);
        this.sucursal = sucursal;
        this.tipoUsuario = tipoUsuario;
        this.rol.push(rol);
    }

    getAll() {
        return `Empleado[nombre:${this.nombre}, apellido:${this.apellido}, email:${this.email}, password:${this.password}, sucursal:${this.sucursal}]`;
    }

    getNombreCompleto() {
        return `${this.nombre} ${this.apellido}`;
    }
<<<<<<< HEAD

    getRol(){
        return this.rol
    }
=======
}
>>>>>>> 38c680f019ec7c4ad2b519ac76850a1fb65f41bf

}
userSchema.loadClass(Empleado);
module.exports = model('Usuario', userSchema);