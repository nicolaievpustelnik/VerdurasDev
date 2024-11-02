const { Router } = require('express');
const router = Router();

const { isAuthenticated, verifyToken } = require('../helps/auth');
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

// Ver todos los Productos
router.get('/productos', isAuthenticated, verifyToken, renderizarProductos);

// Editar producto (Con `:id` para especificar el producto a editar)
router.get('/editarProductoSucursal/:id', isAuthenticated, renderizadoActualizarFormProductoSucursal);
router.put('/actualizarProductoSucursal/:id', verifyToken, actualizarProductoSucursal);

router.get('/editarProductoProveedor/:id', isAuthenticated, renderizadoActualizarFormProductoProveedor);
router.put('/actualizarProductoProveedor/:id', verifyToken, actualizarProductoProveedor);

// Eliminar Producto (usando `:id` para especificar el producto a eliminar)
router.delete('/eliminarProductoSucursal/:id', verifyToken, eliminarProductoSucursal);
router.delete('/eliminarProductoProveedor/:id', verifyToken, eliminarProductoProveedor);

module.exports = router;
