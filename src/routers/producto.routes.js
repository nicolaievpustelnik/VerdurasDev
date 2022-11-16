const { Router } = require('express');
const router = Router();

const { 
    renderizarFormProducto,
    crearProducto,
    renderizarProductos,
    renderizadoActualizarFormProductoSucursal,
    renderizadoActualizarFormProductoProveedor,
    actualizarProductoSucursal,
    actualizarProductoProveedor,
    eliminarProductoSucursal,
    eliminarProductoProveedor
} = require('../controllers/producto.controller');

// Nuevo Producto
router.get('/formProducto', renderizarFormProducto);
router.post('/nuevoProducto', crearProducto);

// Ver todos los Producto
router.get('/productos', renderizarProductos);

// Editar usuario
router.get('/editarProductoSucursal', renderizadoActualizarFormProductoSucursal);
router.put('/actualizarProductoSucursal/:id', actualizarProductoSucursal);
router.get('/editarProductoProveedor', renderizadoActualizarFormProductoProveedor);
router.put('/actualizarProductoProveedor/:id', actualizarProductoProveedor);

// Eliminar Producto
router.delete('/eliminarProductoSucursal/:id', eliminarProductoSucursal);
router.delete('/eliminarProductoProveedor/:id', eliminarProductoProveedor);

module.exports = router;