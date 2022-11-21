const Proveedor = require('../models/Proveedor');

const jwt = require('jsonwebtoken');

const proveedoresControllers = {};

// Get usuario por email
proveedoresControllers.getProviderByCuil = async (req, res) => {

    let query = require('url').parse(req.url, true).query;
    let cuil = query.cuil;

    if (cuil) {
        let proveedor = await res.locals.sucursal.buscarProveedorPorCuil(cuil)

        jwt.verify(req.token, 'secretkey', (error, authData) => {
            if (error) {
                res.sendStatus(403);
            } else {
                res.status(200).json({ status: 200, proveedores: proveedor });
            }
        });
    } else {
        res.sendStatus(403);
    }
}

// Nuevo Proveedor
proveedoresControllers.renderizarFormProveedor = (req, res) => {
    res.render('proveedor/nuevoProveedor');
}

proveedoresControllers.crearProveedor = async (req, res) => {
    try {
        const { cuilProveedor, nombreProveedor } = req.body;

        let nuevoProveedor = null;
        let query = require('url').parse(req.url, true).query;
        jsonResponse = query.jsonResponse;

        if (jsonResponse == "true") {
            jwt.verify(req.token, 'secretkey', async (error, authData) => {
                if (error) {
                    res.sendStatus(403);
                } else {
                    nuevoProveedor = new Proveedor({ cuilProveedor, nombreProveedor });
                    await res.locals.sucursal.agregarProveedor(res, nuevoProveedor);
                    res.status(200).json({ status: 200, proveedor: nuevoProveedor });
                    req.flash('success_msg', "Proveedor agregado exitosamente");
                }
            });

        } else {
            nuevoProveedor = new Proveedor({ cuilProveedor, nombreProveedor });
            await res.locals.sucursal.agregarProveedor(res, nuevoProveedor);
            req.flash('success_msg', "Proveedor agregado exitosamente");
            res.redirect('/proveedores');
        }
    } catch (e) {
        console.log("Lllega al error--------------------------->" + e.message)
        req.flash('error_msg', e.message);
        res.redirect('/formProveedor')
    }
}


// Ver todos los proveedores
proveedoresControllers.renderizarProveedores = async (req, res) => {

    let proveedores = await res.locals.sucursal.listaDeProveedores();
    let query = require('url').parse(req.url, true).query;
    let jsonResponse = query.jsonResponse;
    if (jsonResponse == "true") {
        jwt.verify(req.token, 'secretkey', (error, authData) => {
            if (error) {
                res.sendStatus(403);
            } else {
                res.status(200).json({ status: 200, proveedores: proveedores });
            }
        });
    } else {
        res.render('proveedor/proveedores', { proveedores });
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

    let query = require('url').parse(req.url, true).query;
    let jsonResponse = query.jsonResponse;

    if (jsonResponse == "true") {
        jwt.verify(req.token, 'secretkey', async (error, authData) => {
            if (error) {
                res.sendStatus(403);
            } else {

                let unProveedor = await res.locals.sucursal.editarProveedor(req.params.id, req.body)
                if (unProveedor) {
                    res.status(200).json({ status: 200, usuario: req.body });
                } else {
                    res.sendStatus(403);
                }
            }
        });
    } else {
        try {
            await res.locals.sucursal.editarProveedor(req.params.id, req.body)
            req.flash('success_msg', "Proveedor editado exitosamente");
            res.redirect('/proveedores');
        } catch (e) {
            req.flash('error_msg', e.message);
            res.redirect('/proveedores');
        }
    }


}

// // Eliminar proveedor
proveedoresControllers.eliminarProveedor = (req, res) => {

    let query = require('url').parse(req.url, true).query;
    let jsonResponse = query.jsonResponse;
    let id = req.params.id;

    if(jsonResponse == "true"){
        jwt.verify(req.token, 'secretkey', (error, authData) => {
            if (error) {
                res.sendStatus(403);
            } else {
                res.locals.sucursal.eliminarProveedor(id);
                res.status(200).json({status: 200, proveedorId: id});
            }
        });
    }else{
        res.locals.sucursal.eliminarProveedor(id);
        req.flash('success_msg', "Proveedor eliminado exitosamente");
        res.redirect('/proveedores');
    }
   
}



module.exports = proveedoresControllers;