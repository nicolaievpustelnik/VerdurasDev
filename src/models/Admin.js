const { model } = require('mongoose');

const User = require('./User');
const userSchema = require('./schemas/UserSchema');

class Admin extends User {

    constructor(id, firstName, lastName, email, password, sucursal) {
        super(id, firstName, lastName, email, password, sucursal)
        this.sucursal = sucursal
    }

    getAll() {
        return `Admin[id:${this.id}, firstName:${this.firstName}, lastName:${this.lastName}, lastName:${this.email}, lastName:${this.password}, sucursal:${this.sucursal}]`;
    }

    getFullName() {
        return `${this.firstName} ${this.lastName}`;
    }

    deleteUser(local, idUser) {
        return true;
    }

    ab(a, b) {
        return a + b;
    }
}

userSchema.loadClass(Admin);
module.exports = model('Admin', userSchema);