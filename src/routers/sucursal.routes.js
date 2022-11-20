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
router.post('/nuevaSucursal', validarUsuarioSucursal);

// Ver todos las Opciones
router.get('/opciones', isAuthenticated, renderizarOpciones);

//Recepcionar producto
router.get('/formRecepcion', renderizadoRecepcionFormProducto);
router.post('/recepcionar', recepcionarProductos);

//Egresar producto
router.get('/formEgresar', renderizadoEgresarFormProducto);
router.post('/egresar', egresarProductos,);
/*// Eliminar proveedor
router.delete('/eliminarProveedor/:id', eliminarProveedor); */

module.exports = router;