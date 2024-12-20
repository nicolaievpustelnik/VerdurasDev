const Proveedor = require('../models/Proveedor');

const jwt = require('jsonwebtoken');
const e = require('connect-flash');

const proveedoresControllers = {};

// Get usuario por email
proveedoresControllers.getProviderByCuil = async (req, res) => {

    let query = require('url').parse(req.url, true).query;
    let cuil = query.cuil;

    if (cuil) {
        try {
            let proveedor = await res.locals.sucursal.buscarProveedorPorCuil(cuil)

            jwt.verify(req.token, 'secretkey', (error, authData) => {
                if (error) {
                    res.sendStatus(403);
                } else {
                    res.status(200).json({ status: 200, proveedores: proveedor });
                }
            });
        } catch (e) {
            res.status(500).json({ message: e.message })
        }
    } else {
        res.sendStatus(403);
    }
}

// Nuevo Proveedor
proveedoresControllers.renderizarFormProveedor = (req, res) => {
    res.render('proveedor/nuevoProveedor');
}

proveedoresControllers.crearProveedor = async (req, res) => {

    const { cuilProveedor, nombreProveedor } = req.body;
   // Validaciones de CUIL y Nombre
   const cuilRegex = /^\d{11}$/;  // Regex para validar que el CUIL tenga exactamente 11 números
   const nombreRegex = /^[a-zA-ZÀ-ÿ\s]{3,}$/;  // Regex para validar que el nombre tenga al menos 3 letras

   if (!cuilProveedor || !cuilRegex.test(cuilProveedor)) {
       req.flash('error_msg', "El CUIL es obligatorio y debe tener exactamente 11 números.");
       return res.redirect('/formProveedor');  // Redirige si el CUIL no es válido
   }

   if (!nombreProveedor || !nombreRegex.test(nombreProveedor)) {
       req.flash('error_msg', "El Nombre es obligatorio y debe tener al menos 3 letras.");
       return res.redirect('/formProveedor');  // Redirige si el nombre no es válido
   }
    let nuevoProveedor = null;
    let query = require('url').parse(req.url, true).query;
    jsonResponse = query.jsonResponse;

    if (jsonResponse == "true") {
        jwt.verify(req.token, 'secretkey', async (error, authData) => {
            if (error) {
                res.sendStatus(403);
            } else {
                try {
                    nuevoProveedor = new Proveedor({ cuilProveedor, nombreProveedor });
                    await res.locals.sucursal.agregarProveedor(res, nuevoProveedor);
                    res.status(200).json({ status: 200, proveedor: nuevoProveedor });
                    req.flash('success_msg', "Proveedor agregado exitosamente");
                } catch (e) {
                    res.status(500).json({ message: e.message })
                }
            }
        });

    } else {
        try {
            nuevoProveedor = new Proveedor({ cuilProveedor, nombreProveedor });
            await res.locals.sucursal.agregarProveedor(res, nuevoProveedor);
            req.flash('success_msg', "Proveedor agregado exitosamente");
            res.redirect('/proveedores');
        } catch (e) {
            console.log("Llega al error--------------------------->" + e.message)
            req.flash('error_msg', e.message);
            res.redirect('/formProveedor')
        }
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
                try {
                    await res.locals.sucursal.editarProveedor(req.params.id, req.body)
                    res.status(200).json({ status: 200, usuario: req.body });
                } catch (e) {
                    res.status(500).json({ message: e.message })
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
// Eliminar proveedor
proveedoresControllers.eliminarProveedor = async (req, res) => {
    let query = require('url').parse(req.url, true).query;
    let jsonResponse = query.jsonResponse;
    let id = req.params.id;

    // Verificar si el usuario autenticado es Admin
    if (req.user.tipoUsuario !== "Admin") {
        req.flash("error_msg", "No tienes permiso para eliminar proveedores.");
        return res.redirect("/proveedores");
    }

    if (jsonResponse === "true") {
        jwt.verify(req.token, 'secretkey', async (error) => {
            if (error) {
                return res.sendStatus(403);
            } else {
                try {
                    await res.locals.sucursal.eliminarProveedor(id);
                    res.status(200).json({ status: 200, proveedorId: id });
                } catch (e) {
                    console.error(e);
                    res.status(500).json({ message: e.message });
                }
            }
        });
    } else {
        try {
            await res.locals.sucursal.eliminarProveedor(id);
            req.flash('success_msg', "Proveedor eliminado exitosamente");
            res.redirect('/proveedores');
        } catch (e) {
            console.error(e);
            req.flash('error_msg', "Error al eliminar el proveedor.");
            res.redirect('/proveedores');
        }
    }
};


module.exports = proveedoresControllers;