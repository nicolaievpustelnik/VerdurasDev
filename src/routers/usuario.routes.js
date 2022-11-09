const { Router } = require('express');
const router = Router();

const {
    renderizarFormUsuario,
    crearUsuario,
    renderizarUsuarios,
    renderizadoActualizarFormUsuario,
    actualizarUsuario,
    eliminarUsuario
} = require('../controllers/usuario.controller');

// Nuevo usuario
router.get('/formUsuario', renderizarFormUsuario);
router.post('/nuevoUsuario', crearUsuario);

// Ver todos los usuarios
router.get('/usuarios', renderizarUsuarios);

// Editar usuario
router.get('/editarUsuario', renderizadoActualizarFormUsuario);
router.put('/editarUsuario/:id', actualizarUsuario);

// Eliminar usuario
router.delete('/eliminarUsuario/:id', eliminarUsuario);

module.exports = router;