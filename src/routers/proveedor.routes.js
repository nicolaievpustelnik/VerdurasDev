const { Router } = require('express');
const router = Router();

const { isAuthenticated, verifyToken } = require('../helps/auth');

const {
    renderizarFormProveedor,
    crearProveedor,
    renderizarProveedores,
    renderizadoActualizarFormProveedor,
    actualizarProveedor,
    eliminarProveedor
} = require('../controllers/proveedor.controller');

// Nuevo proveedor
router.get('/formProveedor', isAuthenticated, renderizarFormProveedor);
router.post('/nuevoProveedor', verifyToken, crearProveedor);

// Ver todos los proveedor
router.get('/proveedores', isAuthenticated, verifyToken, renderizarProveedores);

// Editar proveedor
router.get('/editarProveedor', isAuthenticated, renderizadoActualizarFormProveedor);
router.put('/actualizarProveedor/:id', verifyToken, actualizarProveedor);


// Eliminar proveedor
router.delete('/eliminarProveedor/:id', verifyToken, eliminarProveedor);

module.exports = router;