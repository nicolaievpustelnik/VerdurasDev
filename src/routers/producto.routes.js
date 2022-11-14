const { Router } = require('express');
const router = Router();

const { 
    renderizarFormProducto,
    crearProducto,
    renderizarProductos,
    renderizadoActualizarFormProducto,
    actualizarProducto,
    eliminarProducto
} = require('../controllers/producto.controller');

// Nuevo Producto
router.get('/formProducto', renderizarFormProducto);
router.post('/nuevoProducto', crearProducto);

// Ver todos los Producto
router.get('/productos', renderizarProductos);

// Editar usuario
router.get('/editarProducto', renderizadoActualizarFormProducto);
router.put('/actualizarProducto/:id', actualizarProducto);

// Eliminar Producto
router.delete('/eliminarProducto/:id', eliminarProducto);

module.exports = router;