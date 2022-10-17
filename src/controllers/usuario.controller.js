const usuariosControllers = {};

// Nuevo usuario
usuariosControllers.renderizarFormUsuario = (req, res) => {
    res.render('usuario/nuevoUsuario');
}
usuariosControllers.crearUsuario = (req, res) => {
    res.send('Usuario agregado');
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