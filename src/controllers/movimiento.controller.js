const Movimiento = require('../models/Movimiento');

const movimientoControllers = {}

movimientoControllers.crearMovimiento = async (req, res) => {
    try {

        const { cant,descripcionProducto,nombreEnte,monto } = req.body;

        let nuevoMovimiento = new Movimiento({ cant,descripcionProducto,nombreEnte,monto,tipo });

        await nuevoMovimiento.save();

        res.send('Movimiento agregado');

    } catch (e) {

        console.log(e)
    }
}

// Ver todos los movimientos
movimientosControllers.renderizarMovimientos = async (req, res) => {

    let moviemientos = await res.locals.sucursal.listaDeMovimientos();
    let query = require('url').parse(req.url, true).query;
    let jsonResponse = query.jsonResponse;

    if(jsonResponse == "true"){

        jwt.verify(req.token, 'secretkey', (error, authData) => {
            if (error) {
                res.sendStatus(403);
            } else {
                res.status(200).json({status: 200, movimientos: movimientos});
            }
        });

    }else{
        res.render('movimiento/movimientos', { movimientos });
    }   
}
// Actualizar Movimiento
movimientosControllers.renderizadoActualizarFormMovimientos = async (req, res) => {
    let query = require('url').parse(req.url, true).query;
    let id = query.id;
    console.log(id)
    let movimiento = await res.locals.sucursal.buscarMovimientoPorId(id);
    res.render('proveedor/editarMovimiento', { movimiento });
}

movimientosControllers.actualizarMoviemiento= async (req, res) => {

    let movimientos = await res.locals.sucursal.listaDeMovimientos();
    let query = require('url').parse(req.url, true).query;
    let jsonResponse = query.jsonResponse;

    if(jsonResponse == "true"){

        jwt.verify(req.token, 'secretkey', async (error, authData) => {
            if (error) {
                res.sendStatus(403);
            } else {

                let user = await res.locals.sucursal.editarMovimiento(req.params.id, req.body)
                if (user) {
                    res.status(200).json({status: 200, usuario: req.body});    
                }else{
                    res.sendStatus(403);
                }
            }
        });

    }else{

        await res.locals.sucursal.editarMovimiento(req.params.id, req.body)
        req.flash('success_msg', "Movimiento editado exitosamente");
        res.redirect('/movimientos');
    } 
    
}

// Eliminar movimiento
movimientosControllers.eliminarMovimiento = (req, res) => {

    let query = require('url').parse(req.url, true).query;
    let jsonResponse = query.jsonResponse;
    let id = req.params.id;

    if(jsonResponse == "true"){

        jwt.verify(req.token, 'secretkey', (error, authData) => {
            if (error) {
                res.sendStatus(403);
            } else {
                res.locals.sucursal.eliminarMovimiento(id);
                res.status(200).json({status: 200, usuarioId: id});
            }
        });

    }else{
        res.locals.sucursal.eliminarMovimiento(id);
        req.flash('success_msg', "Movimiento eliminado exitosamente");
        res.redirect('/movimientos');
    }
    
}

module.exports = movimientosControllers;

