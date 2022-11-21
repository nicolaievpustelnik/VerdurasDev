const Proveedor = require('../models/Proveedor');

const proveedoresControllers = {};

// Nuevo Proveedor
proveedoresControllers.renderizarFormProveedor = (req, res) => {
    res.render('proveedor/nuevoProveedor');
}

proveedoresControllers.crearProveedor = async (req, res) => {
    try {
        const { cuilProveedor, nombreProveedor } = req.body;
        let nuevoProveedor = null;
        nuevoProveedor = new Proveedor({ cuilProveedor, nombreProveedor });
        await res.locals.sucursal.agregarProveedor(res, nuevoProveedor);
        req.flash('success_msg', "Proveedor agregado exitosamente");
        res.redirect('/proveedores');
    } catch (e) {
        console.log("Lllega al error")
        req.flash('error_msg', e.message);
        res.redirect('/formProveedor');
    }
}


// Ver todos los proveedores
proveedoresControllers.renderizarProveedores = async (req, res) => {

    let proveedores = await res.locals.sucursal.listaDeProveedores();
    let query = require('url').parse(req.url, true).query;
    let jsonResponse = query.jsonResponse;

    if(jsonResponse == "true"){

        jwt.verify(req.token, 'secretkey', (error, authData) => {
            if (error) {
                res.sendStatus(403);
            } else {
                res.status(200).json({status: 200, proveedores: proveedores});
            }
        });

    }else{
        res.render('proveedor/proveedores', { proveedor });
    }   
}
// Actualizar Proveedor
proveedoresControllers.renderizadoActualizarFormProveedor = async (req, res) => {
    let query = require('url').parse(req.url, true).query;
    let id = query.id;
    console.log(id)
    let proveedor = await res.locals.sucursal.buscarProveedorPorId(id);
    res.render('proveedor/editarProveedor', { proveedor });
}

proveedoresControllers.actualizarProveedor = async (req, res) => {

    // let movimientos = await res.locals.sucursal.listaDeProveedores();
    // let query = require('url').parse(req.url, true).query;
    // let jsonResponse = query.jsonResponse;

    // if(jsonResponse == "true"){

    //     jwt.verify(req.token, 'secretkey', async (error, authData) => {
    //         if (error) {
    //             res.sendStatus(403);
    //         } else {

    //             let user = await res.locals.sucursal.editarMovimiento(req.params.id, req.body)
    //             if (user) {
    //                 res.status(200).json({status: 200, usuario: req.body});    
    //             }else{
    //                 res.sendStatus(403);
    //             }
    //         }
    //     });

    // }else{

    //     await res.locals.sucursal.editarProveedor(req.params.id, req.body)
    //     req.flash('success_msg', "Proveedor editado exitosamente");
    //     res.redirect('/proveedor');
    // } 
    
}

// // Eliminar proveedor
proveedoresControllers.eliminarProveedor = (req, res) => {

    // let query = require('url').parse(req.url, true).query;
    // let jsonResponse = query.jsonResponse;
    // let id = req.params.id;

    // if(jsonResponse == "true"){

    //     jwt.verify(req.token, 'secretkey', (error, authData) => {
    //         if (error) {
    //             res.sendStatus(403);
    //         } else {
    //             res.locals.sucursal.eliminarProveedor(id);
    //             res.status(200).json({status: 200, usuarioId: id});
    //         }
    //     });

    // }else{
    //     res.locals.sucursal.eliminarMovimiento(id);
    //     req.flash('success_msg', "Movimiento eliminado exitosamente");
    //     res.redirect('/movimientos');
    // }
    
}



module.exports = proveedoresControllers;