const { Router } = require('express');
const router = Router();

const { } = require('../controllers/usuario.controller');

// Nuevo Producto
router.get('/formProducto', renderizarFormProducto);
router.post('/nuevoProdcuto', crearProducto);

module.exports = router;