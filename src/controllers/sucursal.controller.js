const Sucursal = require('../Sucursal')
const jwt = require('jsonwebtoken');

const sucursalesControllers = {};

// Get sucursaln
sucursalesControllers.getSucursal = async (req, res) => {

    let unaSucursal = await res.locals.sucursal
    jwt.verify(req.token, 'secretkey', (error, authData) => {
        if (error) {
            res.sendStatus(403);
        } else {
            res.status(200).json({ status: 200, sucursal: unaSucursal });
        }
    });
}


// Nuevo Proveedor
sucursalesControllers.renderizarFormIngresoASucursal = (req, res) => {
    res.render('sucursal/nuevaSucursal');
}

sucursalesControllers.validarUsuarioSucursal = async (req, res) => {
    const { nombreSucursal } = req.body;
    
    var nombreRecibido = nombreSucursal;
    let query = require('url').parse(req.url, true).query;
    jsonResponse = query.jsonResponse;
    if (jsonResponse == "true") {
        try {
            jwt.verify(req.token, 'secretkey', async (error, authData) => {
                if (error) {
                    res.sendStatus(403);
                } else {
                    console.log("Estoy llegando hasta el centro")
                    let esValido = await res.locals.sucursal.validarSiEsDeSucursal(res, nombreRecibido);
                    res.status(200).json({ status: 200, sucursal: esValido });
                }
            });
        } catch (e) {
            res.status(400).json({ status: 400 });
        }

    } else {
        try {
            await res.locals.sucursal.validarSiEsDeSucursal(res, nombreRecibido);
            req.flash('success_msg', "Eres miembro de esta sucursal");
            res.redirect('/opciones');

        } catch (err) {
            console.log("Enyta al catch")
            await res.locals.sucursal.dispararAlerta(res, err);
            req.flash('error_msg', "Usuario no pertenece a Sucursal");
            res.redirect('/formSucursal');
        }
    }
}



// Ver toda las opciones 
sucursalesControllers.renderizarOpciones = async (req, res) => {
    let usuario = res.locals.user;
    let emailUsuario = usuario.email;
    let nombreSuc = usuario.sucursal;
    res.render('sucursal/opciones', { emailUsuario, nombreSuc });
}

//mostrar formulario de ingreso de cuil 
sucursalesControllers.renderizarIngresarCuil = async (req, res) => {
    let usuario = res.locals.user;
    let emailUsuario = usuario.email
    res.render('sucursal/formIngresarCuil', { emailUsuario });
}

//mostrar formulario de recepcion
sucursalesControllers.renderizadoRecepcionFormProducto = async (req, res) => {
    res.render('sucursal/formRecepcion');
}

//mostrar formulario de recepcion
sucursalesControllers.renderizadoRecepcionFormIngresarCuil = async (req, res) => {
    res.render('sucursal/formIngresarCuil');
}

sucursalesControllers.recepcionarProductos = async (req, res) => {
    try {
        const { cuilProveedor, codigoBarra, cantidad } = req.body;
        let cuil = cuilProveedor;
        let scanner = codigoBarra;
        let cant = cantidad;
        await res.locals.sucursal.recepcionarProductoSucursal(res, cuil, scanner, cant);
        req.flash('success_msg', "Se recepciono exitosamente");
        res.redirect('/formRecepcion');
    } catch (err) {
        await res.locals.sucursal.dispararAlerta(res, err);
        req.flash('error_msg', err.message);
        res.redirect('/formRecepcion');
    }
}

//mostrar formulario de egreso
sucursalesControllers.renderizadoEgresarFormProducto = async (req, res) => {
    res.render('sucursal/formEgresar');
}

sucursalesControllers.egresarProductos = async (req, res) => {
    console.log("Entre a controller egresar")
    try {
        const { dniCliente, codigoBarra, cantidad } = req.body;
        let dni = dniCliente;
        let scanner = codigoBarra;
        let cant = cantidad;
        await res.locals.sucursal.egresarProducto(res, dni, scanner, cant);
        req.flash('success_msg', "Se egreso exitosamente");
        res.redirect('/formEgresar');

    } catch (err) {
        console.log("Error que llega " + err)
        await res.locals.sucursal.dispararAlerta(res, err);
        req.flash('error_msg', err.message);
        res.redirect('/formEgresar');
    }
}

module.exports = sucursalesControllers;
