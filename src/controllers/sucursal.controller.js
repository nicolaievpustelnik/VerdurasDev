const Sucursal = require('../Sucursal');

const sucursalesControllers = {};

// Nuevo Proveedor
sucursalesControllers.renderizarFormIngresoASucursal = (req, res) => {
    res.render('sucursal/nuevaSucursal');
}

sucursalesControllers.validarUsuarioSucursal = async (req, res) => {
    try {
        const { nombreSucursal } = req.body;
        let nombreSucursalRecibido = nombreSucursal;
        
        await res.locals.sucursal.validarSiEsDeSucursal(res, nombreSucursalRecibido);
        req.flash('success_msg', "Eres miembro de esta sucursal");
        res.redirect('/opciones');

    } catch (err) {
        await res.locals.sucursal.dispararAlerta(res, err);
        req.flash('success_msg', "Usuario no pertenece a Sucursal");
        res.redirect('/formSucursal');
    }
}

// Ver todos los Proveedores
sucursalesControllers.renderizarOpciones = async (req, res) => {
    let usuario = await res.locals.sucursal.obtenerUsuarioLogueado();
    let emailUsuario = usuario[0].email
    console.log(emailUsuario[0].email)
    res.render('sucursal/opciones', { emailUsuario});
}

module.exports = sucursalesControllers;