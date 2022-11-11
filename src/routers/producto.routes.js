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
router.post('/nuevoProdcuto', crearProducto);

// Ver todos los Producto
router.get('/producto', renderizarProductos);

// Editar usuario
router.get('/editarProducto', renderizadoActualizarFormProducto);
router.put('/actualizarProducto/:codigoBarra', actualizarProducto);

// Eliminar Producto
router.delete('/eliminarProducto/:codigoBarra', eliminarProducto);

module.exports = router;