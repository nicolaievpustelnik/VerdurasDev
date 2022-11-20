const { Router } = require('express');
const router = Router();

const {isAuthenticated, verifyToken} = require('../helps/auth');

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
router.get('/formProducto', isAuthenticated, renderizarFormProducto);
router.post('/nuevoProducto', verifyToken, crearProducto);

// Ver todos los Producto
router.get('/productos', isAuthenticated, verifyToken, renderizarProductos);

// Editar producto
router.get('/editarProductoSucursal', isAuthenticated, renderizadoActualizarFormProductoSucursal);
router.put('/actualizarProductoSucursal/:id', verifyToken, actualizarProductoSucursal);
router.get('/editarProductoProveedor', isAuthenticated, renderizadoActualizarFormProductoProveedor);
router.put('/actualizarProductoProveedor/:id', verifyToken, actualizarProductoProveedor);

// Eliminar Producto
router.delete('/eliminarProductoSucursal/:id', verifyToken, eliminarProductoSucursal);
router.delete('/eliminarProductoProveedor/:id', verifyToken, eliminarProductoProveedor);

module.exports = router;