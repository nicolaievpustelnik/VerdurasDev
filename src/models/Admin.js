const { model } = require('mongoose');

const User = require('./User');
const userSchema = require('./schemas/UserSchema');

class Admin extends User {

    constructor(id, firstName, lastName, email, password, sucursal) {
        super(id, firstName, lastName, email, password, sucursal)
        this.sucursal = sucursal
    }

    getAll() {
        return `Admin[id:${this.id}, firstName:${this.firstName}, lastName:${this.lastName}, email:${this.email}, password:${this.password}, sucursal:${this.sucursal}]`;
    }

    getFullName() {
        return `${this.firstName} ${this.lastName}`;
    }

    deleteUser(local, idUser) {
        if (!local) {
            throw new Error('Local invalido');
        }

        if (idUser < 1 || !idUser) {
            throw new Error('IdUser invalido');
        }

        return true;
    }
}

userSchema.loadClass(Admin);
module.exports = model('Admin', userSchema);