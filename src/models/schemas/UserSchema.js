const { Schema } = require('mongoose');
const bcryptjs = require('bcryptjs');

const userSchema = new Schema({

    firstName: {
        type: String,
        require: true
    },
    lastName: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    },
    sucursal: {
        type: String,
        require: true
    }

}, {
    timestamps: true
})

userSchema.methods.encryptPassword = async password => {
    const salt = await bcryptjs.genSalt(10);
    return await bcryptjs.hash(password, salt);
};

userSchema.methods.matchPassword = async function (password) {
    return await bcryptjs.compare(password, this.password);
};

module.exports = userSchema;