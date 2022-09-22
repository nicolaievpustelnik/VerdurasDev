const { model } = require('mongoose');

const User = require('./User');
const userSchema = require('./UserSchema');


class Admin extends User {

    constructor(firstName, lastName, email, password, sucursal) {
        super(firstName, lastName, email, password, sucursal)
        this.sucursal = sucursal
    }

    getAll() {
        return `Admin[firstName:${this.firstName}, lastName:${this.lastName}, lastName:${this.email}, lastName:${this.password}, sucursal:${this.sucursal}]`;
    }
}

userSchema.loadClass(Admin);
module.exports = model('Admin', userSchema);