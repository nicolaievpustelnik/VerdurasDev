const Empleado = require('../models/Empleado');
const Admin = require('../models/Admin');

const usuariosControllers = {};

// Nuevo usuario
usuariosControllers.renderizarFormUsuario = (req, res) => {
    res.render('usuario/nuevoUsuario');
}

usuariosControllers.crearUsuario = async (req, res) => {
    try {

        const { legajo, nombre, apellido, email, password, sucursal, tipoUsuario, rol } = req.body;

        let newUser = null;

        switch (tipoUsuario) {
            case 'Admin':
                newUser = new Admin({ legajo, nombre, apellido, email, password, sucursal, tipoUsuario });
                break;

            case 'Empleado':
                newUser = new Empleado({ legajo, nombre, apellido, email, password, sucursal, tipoUsuario, rol });
                break;

            default:
                break;
        }

        await res.locals.sucursal.agregarUsuario(res, newUser);
        res.redirect('/usuarios');

    } catch (e) {

        console.log(e)
    }
}

// Ver todos los usuarios
usuariosControllers.renderizarUsuarios = async (req, res) => {

    let usuarios = await res.locals.sucursal.listaDeUsuarios()

    res.render('usuario/usuarios', { usuarios });
}

// Actualizar usuario
usuariosControllers.renderizadoActualizarFormUsuario = async (req, res) => {
    let query = require('url').parse(req.url, true).query;
    let id = query.id;
    let usuario = await res.locals.sucursal.buscarUsuarioPorId(id)
    res.render('usuario/editarUsuario', { usuario });
}

usuariosControllers.actualizarUsuario = (req, res) => {
    res.send('Usuario actualizado');
}

// Eliminar usuario
usuariosControllers.eliminarUsuario = (req, res) => {

    let id = req.params.id;
    res.locals.sucursal.eliminarUsuario(id);
    res.redirect('/usuarios');
}

module.exports = usuariosControllers;