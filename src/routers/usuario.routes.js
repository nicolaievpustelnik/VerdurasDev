const { Router } = require('express');
const router = Router();

const {isAuthenticated, verifyToken} = require('../helps/auth');

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
    auth,
    getUserByEmail
} = require('../controllers/usuario.controller');

// Auth Token
router.post('/auth', auth);

// Ver usuarios por mail
router.get('/usuario', verifyToken, getUserByEmail);

// Nuevo usuario
router.get('/formUsuario', renderizarFormUsuario);
router.post('/nuevoUsuario', verifyToken, isAuthenticated, crearUsuario);

// Ver todos los usuarios
router.get('/usuarios', verifyToken, isAuthenticated, renderizarUsuarios);

// Editar usuario
router.get('/editarUsuario', renderizadoActualizarFormUsuario);
router.put('/actualizarUsuario/:id', verifyToken, actualizarUsuario);

// Eliminar usuario
router.delete('/eliminarUsuario/:id', verifyToken, eliminarUsuario);

// Registrar usuario
router.get('/formRegistroUsuario', renderRegistrarUsuarioForm);
router.post('/registroUsuario', registrarUsuario);

// Login usuario
router.get('/formLoginUsuario', renderLoginUsuarioForm);
router.post('/loginUsuario', loginUsuario);

// Cerrar sesion usuario
router.get('/cerrarSesion', cerrarSesionUsuario);

module.exports = router;