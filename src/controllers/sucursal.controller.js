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
        console.log("Enyta al catch")
        await res.locals.sucursal.dispararAlerta(res, err);
        req.flash('error_msg', "Usuario no pertenece a Sucursal");
        res.redirect('/formSucursal');
    }
}

// Ver toda las opciones 
sucursalesControllers.renderizarOpciones = async (req, res) => {
    let usuario = res.locals.user; 
    let emailUsuario = usuario.email;
    let nombreSuc = usuario.sucursal;
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
        req.flash('error_msg', err.message);
        res.redirect('/formRecepcion');
    } 
}

//mostrar formulario de egreso
sucursalesControllers.renderizadoEgresarFormProducto = async(req,res) => {
    res.render('sucursal/formEgresar');
}

sucursalesControllers.egresarProductos = async (req, res) => {
    console.log("Entre a controller egresar")
    try {
        const { dniCliente, codigoBarra, cantidad } = req.body;
        let dni = dniCliente;
        let scanner = codigoBarra;
        let cant = cantidad;
        await res.locals.sucursal.egresarProducto(res, dni,scanner,cant);
        req.flash('success_msg', "Se egreso exitosamente");
        res.redirect('/formEgresar');

    } catch (err) {
        console.log("Error que llega "+err)
        await res.locals.sucursal.dispararAlerta(res, err);
        req.flash('error_msg', err.message);
        res.redirect('/formEgresar');
    } 
}

module.exports = sucursalesControllers;
