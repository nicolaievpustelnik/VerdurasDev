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
        req.flash('error_msg', "Usuario no pertenece a Sucursal");
        res.redirect('/formSucursal');
    }
}

// Ver toda las opciones 
sucursalesControllers.renderizarOpciones = async (req, res) => {
    let usuario = await res.locals.sucursal.obtenerUsuarioLogueado();
    let emailUsuario = usuario[0].email;
    let nombreSuc = usuario[0].sucursal;
    res.render('sucursal/opciones', { emailUsuario,nombreSuc});
}

//mostrar formulario de recepcion
sucursalesControllers.renderizadoRecepcionFormProducto = async(req,res) => {
    res.render('sucursal/formRecepcion');
}

 sucursalesControllers.recepcionarProductos = async (req, res) => {
    try {
        const { cuilProveedor, codigoBarra, cantidad } = req.body;
        let cuil = cuilProveedor;
        let scanner = codigoBarra;
        let cant = cantidad;

        await res.locals.sucursal.recepcionarProductoSucursal(res, cuil,scanner,cant);
        req.flash('success_msg', "Se recepciono exitosamente");
        res.redirect('/formRecepcion');
        

    } catch (err) {
        await res.locals.sucursal.dispararAlerta(res, err);
        req.flash('error_msg', "Se genero una notificacion");
        //res.redirect('/formSucursal');
    } 
}

module.exports = sucursalesControllers;
