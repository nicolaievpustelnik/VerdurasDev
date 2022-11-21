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

} = require('../controllers/sucursal.controller');

// Sucursal
router.get('/formSucursal', isAuthenticated, renderizarFormIngresoASucursal);
router.post('/nuevaSucursal',isAuthenticated, validarUsuarioSucursal);

// Ver todos las Opciones
router.get('/opciones', isAuthenticated, renderizarOpciones);

//Recepcionar producto
router.get('/formRecepcion/',isAuthenticated, renderizadoRecepcionFormProducto);
router.post('/recepcionar',isAuthenticated, recepcionarProductos);

//Egresar producto
router.get('/formEgresar',isAuthenticated, renderizadoEgresarFormProducto);
router.post('/egresar',isAuthenticated, egresarProductos,);




module.exports = router;