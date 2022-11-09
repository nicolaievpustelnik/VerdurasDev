const { Schema } = require('mongoose');
const bcryptjs = require('bcryptjs');

const usuarioSchema = new Schema({

    legajo: {
        type: String,
        require: true
    },
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
    tipoUsuario: {
        type: String,
        require: true
    },
    rol: {
        type: [],
        require: true
    }

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