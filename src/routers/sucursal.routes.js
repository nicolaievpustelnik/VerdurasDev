const { Router } = require('express');
const router = Router();

const {isAuthenticated, verifyToken} = require('../helps/auth');

const {
    renderizarFormIngresoASucursal,
    validarUsuarioSucursal,
    renderizarOpciones,
    renderizadoRecepcionFormProducto,
    recepcionarProductos,
    renderizadoEgresarFormProducto,
    egresarProductos,
    //eliminarProveedor
} = require('../controllers/sucursal.controller');

// Sucursal
router.get('/formSucursal', isAuthenticated, renderizarFormIngresoASucursal);
router.post('/nuevaSucursal',verifyToken, validarUsuarioSucursal);

// Ver todos las Opciones
router.get('/opciones', verifyToken, isAuthenticated, renderizarOpciones);

//Recepcionar producto
router.get('/formRecepcion/',isAuthenticated, renderizadoRecepcionFormProducto);
router.post('/recepcionar',verifyToken, recepcionarProductos);

//Egresar producto
router.get('/formEgresar',isAuthenticated, renderizadoEgresarFormProducto);
router.post('/egresar',verifyToken, egresarProductos,);

module.exports = router;