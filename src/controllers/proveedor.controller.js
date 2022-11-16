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
        res.redirect('/proveedores');
    } catch (e) {
        console.log(e)
    }
}

// Ver todos los Proveedores
proveedoresControllers.renderizarProveedores = async (req, res) => {

    let proveedores = await res.locals.sucursal.listaDeProveedores();

    res.render('proveedor/proveedores', { proveedores });
}

// Actualizar Proveedor
proveedoresControllers.renderizadoActualizarFormProveedor = async (req, res) => {
    let query = require('url').parse(req.url, true).query;
    let id = query.id;
    let proveedor = await res.locals.sucursal.buscarProveedorPorId(id);
    res.render('proveedor/editarProveedor', { proveedor});
}

proveedoresControllers.actualizarProveedor = (req, res) => {
    res.send('Proveedor actualizado');
}

// Eliminar Proveedor
proveedoresControllers.eliminarProveedor = (req, res) => {
    let id = req.params.id;
    res.locals.sucursal.eliminarProveedor(id);
    res.redirect('/proveedores');
}

module.exports = proveedoresControllers;