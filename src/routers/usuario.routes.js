const { Router } = require('express');
const router = Router();

const {isAuthenticated} = require('../helps/auth');

const {
    renderizarFormUsuario,
    crearUsuario,
    renderizarUsuarios,
    renderizadoActualizarFormUsuario,
    actualizarUsuario,
    eliminarUsuario,
    renderRegistrarUsuarioForm,
    registrarUsuario,
    renderLoginUsuarioForm,
    loginUsuario,
    cerrarSesionUsuario,
    usuariosJson
} = require('../controllers/usuario.controller');

// Nuevo usuario
router.get('/formUsuario', renderizarFormUsuario);
router.post('/nuevoUsuario', crearUsuario);

// Ver todos los usuarios
//router.get('/usuarios', isAuthenticated, renderizarUsuarios);
router.get('/usuarios', isAuthenticated, renderizarUsuarios);

// Editar usuario
router.get('/editarUsuario', renderizadoActualizarFormUsuario);
router.put('/actualizarUsuario/:id', actualizarUsuario);

// Eliminar usuario
router.delete('/eliminarUsuario/:id', eliminarUsuario);

// Registrar usuario
router.get('/formRegistroUsuario', renderRegistrarUsuarioForm);
router.post('/registroUsuario', registrarUsuario);

// Login usuario
router.get('/formLoginUsuario', renderLoginUsuarioForm);
router.post('/loginUsuario', loginUsuario);

// Cerrar sesion usuario
router.get('/cerrarSesion', cerrarSesionUsuario);

module.exports = router;