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
router.get('/proveedores', renderizarProveedores);

// Editar proveedor
router.get('/editarProveedor', renderizadoActualizarFormProveedor);
router.put('/actualizarProveedor/:id', actualizarProveedor);

// Eliminar proveedor
router.delete('/eliminarProveedor/:id', eliminarProveedor);

module.exports = router;