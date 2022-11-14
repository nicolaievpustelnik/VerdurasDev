const { Router } = require('express');
const router = Router();

const {
    renderizarFormProveedor,
    crearProveedor,
    renderizarProveedores,
    renderizadoActualizarFormProveedor,
    actualizarProveedor,
    eliminarProveedor
} = require('../controllers/proveedor.controller');

// Nuevo proveedor
router.get('/formProveedor', renderizarFormProveedor);
router.post('/nuevoProveedor', crearProveedor);

// Ver todos los proveedor
router.get('/proveedor', renderizarProveedores);

// Editar proveedor
router.get('/editarProveedor', renderizadoActualizarFormProveedor);
router.put('/actualizarProveedor/:cuil', actualizarProveedor);

// Eliminar proveedor
router.delete('/eliminarProveedor/:cuil', eliminarProveedor);

module.exports = router;