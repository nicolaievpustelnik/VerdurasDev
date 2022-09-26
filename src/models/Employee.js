const { model } = require('mongoose');

const User = require('./User');
const userSchema = require('./schemas/UserSchema');


class Employee extends User {

    constructor(firstName, lastName, email, password, sucursal) {
        super(firstName, lastName, email, password, sucursal)
        this.sucursal = sucursal
    }

    getAll() {
        return `Employee[firstName:${this.firstName}, lastName:${this.lastName}, lastName:${this.email}, lastName:${this.password}, sucursal:${this.sucursal}]`;
    }
}

userSchema.loadClass(Employee);
module.exports = model('Employee', userSchema);