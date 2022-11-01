const { model } = require('mongoose');

const Usuario = require('./Usuario');
const Rol = require('./Rol');
const userSchema = require('./schemas/UsuarioSchema');

class Empleado extends Usuario {
    //CONSTRUCTOR DELMER
    constructor(id, legajo, nombre, apellido, email, password, sucursal, tipoUsuario) {
        super(id, legajo, nombre, apellido, email, password);
        this.sucursal = sucursal;
        this.tipoUsuario = tipoUsuario;
        this.roles = [];
    }
    //CONSTRUCTOR NICO
    /* constructor(nombre, apellido, email, password, sucursal, tipoUsuario, roles) {
        super(nombre, apellido, email, password);
        this.sucursal = sucursal;
        this.tipoUsuario = tipoUsuario;
        this.roles.push(roles);
    } */

    getAll() {
        return `Empleado[nombre:${this.nombre}, apellido:${this.apellido}, email:${this.email}, password:${this.password}, sucursal:${this.sucursal}]`;
    }

    getNombreCompleto() {
        return `${this.nombre} ${this.apellido}`;
    }

    getRoles() {
        return this.roles
    }

     agregarRol(unRol) {
         if (this.existeRol(unRol.nomRol)) {
             throw new Error('Rol ya existe!')
         }
          return  this.roles.push(unRol); 
     }

    //Verifica si tiene rol.
     existeRol(nombre) {
         return !!this.roles.find(r => r.nomRol === nombre);
     }

    //Delego la responsabilidad a Empleado que me diga si tiene el rol.
    /* verificarSiTieneRol(nom) {
        let tieneRol = this.roles.find(r => r.nomRol == nom);
        if (!tieneRol && (!(Usuario instanceof Admin))) {
            throw new Error('Intenta ejecutar una tarea no autorizada');
        }
        return !!tieneRol;
    } */

}
userSchema.loadClass(Empleado);
module.exports = model('Usuario', userSchema);