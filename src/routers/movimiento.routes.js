const { Router } = require('express');
const router = Router();

const {isAuthenticated, verifyToken} = require('../helps/auth');

// Nuevo Movimiento
router.get('/crearMovimiento', crearMovimiento);

// Ver todos las movimiento
router.get("/movimientos",  verifyToken, isAuthenticated, renderizarMovimientos);

// Editar Movimiento
router.get("/editarMovimiento",isAuthenticated, renderizadoActualizarFormMovimiento);
router.put("/actualizarMovimiento", verifyToken, actualizarMovimiento);

// Eliminar Movimiento
router.delete("/eliminarMovimiento/:id", verifyToken, eliminarMoviemiento);

module.exports = router;

