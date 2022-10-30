const usuariosControllers = {};

const Empleado = require('../models/Empleado');
const Admin = require('../models/Admin');
const Usuario = require('../models/Usuario');

// Nuevo usuario
usuariosControllers.renderizarFormUsuario = (req, res) => {
    res.render('usuario/nuevoUsuario');
}
usuariosControllers.crearUsuario = async (req, res) => {
    try {

        const { nombre, apellido, email, password, sucursal, tipoUsuario, rol } = req.body;

        let newUser = null;

        switch (tipoUsuario) {
            case 'Admin':
                newUser = new Admin({ nombre, apellido, email, password, sucursal, tipoUsuario });
                break;

            case 'Empleado':
                newUser = new Empleado({ nombre, apellido, email, password, sucursal, tipoUsuario, rol });
                break;

            default:
                break;
        }

        await newUser.save();

        res.send('Usuario agregado');

    } catch (e) {

        console.log(e)
    }
}

// Ver todos los usuarios
usuariosControllers.renderizarUsuarios = (req, res) => {
    res.send('Usuario agregado');
}

// Actualizar usuario
usuariosControllers.renderizadoActualizarFormUsuario = (req, res) => {
    res.send('Usuario agregado');
}
usuariosControllers.actualizarUsuario = (req, res) => {
    res.send('Usuario agregado');
}

// Eliminar usuario
usuariosControllers.eliminarUsuario = (req, res) => {
    res.send('Usuario agregado');
}

module.exports = usuariosControllers;