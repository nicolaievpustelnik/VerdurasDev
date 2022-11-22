const { Router } = require('express');
const router = Router();

const {isAuthenticated, verifyToken} = require('../helps/auth');

const {
    renderizarFormMovimiento,
    renderizarMovimientos,
    renderizadoActualizarFormMovimiento,
    actualizarMovimiento,
    eliminarMovimiento,

} = require('../controllers/sucursal.controller');

// Nuevo Movimiento
router.get('/nuevoMovimiento',isAuthenticated, renderizarFormMovimiento);

// Ver todos las movimiento
router.get("/movimientos",  verifyToken, isAuthenticated, renderizarMovimientos);

// Editar Movimiento
router.get("/editarMovimiento",isAuthenticated, renderizadoActualizarFormMovimiento);
router.put("/actualizarMovimiento", verifyToken, actualizarMovimiento);

// Eliminar Movimiento
router.delete("/eliminarMovimiento/:id", verifyToken, eliminarMovimiento);

module.exports = router;

