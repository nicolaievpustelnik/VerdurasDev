const { Schema } = require('mongoose');
const bcryptjs = require('bcryptjs');

const usuarioSchema = new Schema({

    nombre: {
        type: String,
        require: true
    },
    apellido: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
    },
    password: {
        type: String,
        require: true
    },
    sucursal: {
        type: String,
        require: true
    },

}, {
    timestamps: true
})

usuarioSchema.methods.encryptPassword = async password => {
    const salt = await bcryptjs.genSalt(10);
    return await bcryptjs.hash(password, salt);
};

usuarioSchema.methods.matchPassword = async function (password) {
    return await bcryptjs.compare(password, this.password);
};

module.exports = usuarioSchema;