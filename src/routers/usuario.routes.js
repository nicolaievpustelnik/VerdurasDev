const { Router } = require('express');
const router = Router();

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
    cerrarSesionUsuario
} = require('../controllers/usuario.controller');

// Nuevo usuario
router.get('/formUsuario', renderizarFormUsuario);
router.post('/nuevoUsuario', crearUsuario);

// Ver todos los usuarios
router.get('/usuarios', renderizarUsuarios);

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