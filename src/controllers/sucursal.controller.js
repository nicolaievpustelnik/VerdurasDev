const Sucursal = require('../Sucursal')
const Empleado = require("../models/Empleado");
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

    let query = require('url').parse(req.url, true).query;
    jsonResponse = query.jsonResponse;

    if (jsonResponse == "true") {

        const { nombreSucursal, email, password } = req.body;

        const user = await Empleado.findOne({ email });

        if (!user) {
            res.sendStatus(403);
        } else {

            const match = await user.matchPassword(password);

            if (match) {

                res.locals.user = user;

                try {
                    jwt.verify(req.token, 'secretkey', async (error, authData) => {
                        if (error) {
                            res.sendStatus(403);
                        } else {
                            try {
                                let esValido = await res.locals.sucursal.validarSiEsDeSucursal(res, nombreSucursal);
                                res.status(200).json({ status: 200, sucursal: esValido });
                            } catch (e) {
                                res.status(500).json({ message: e.message })
                            }
                        }
                    });
                } catch (e) {
                    res.status(400).json({ status: 400 });
                }

            } else {
                res.sendStatus(403);
            }
        }


    } else {

        const { nombreSucursal } = req.body;

        try {
            await res.locals.sucursal.validarSiEsDeSucursal(res, nombreSucursal);
            req.flash('success_msg', "Eres miembro de esta sucursal");
            res.redirect('/opciones');

        } catch (err) {
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

//mostrar formulario de recepcion
sucursalesControllers.renderizadoRecepcionFormProducto = async (req, res) => {
    res.render('sucursal/formRecepcion');
}

sucursalesControllers.recepcionarProductos = async (req, res) => {
    let query = require('url').parse(req.url, true).query;
    jsonResponse = query.jsonResponse;
    
    if (jsonResponse == "true") {
        const { email, password, cuilProveedor, codigoBarra, cantidad } = req.body;
        let cuil = cuilProveedor;
        let scanner = codigoBarra;
        let cant = cantidad;

        const user = await Empleado.findOne({ email });

        if (!user) {
            res.sendStatus(403);
        } else {

            const match = await user.matchPassword(password);

            if (match) {

                res.locals.user = user;

                try {
                    jwt.verify(req.token, 'secretkey', async (error, authData) => {
                        if (error) {
                            res.sendStatus(403);
                        } else {
                            try {
                                let esValido = await res.locals.sucursal.recepcionarProductoSucursal(res, cuil, scanner, cant);
                                res.status(200).json({ status: 200, productoIngresado: esValido });
                            } catch (e) {
                                res.status(500).json({ message: e.message })
                            }
                        }
                    });
                } catch (e) {
                    res.status(400).json({ status: 400 });
                }
            }
        }
    } else {

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
}

//mostrar formulario de egreso
sucursalesControllers.renderizadoEgresarFormProducto = async (req, res) => {
    res.render('sucursal/formEgresar');
}

sucursalesControllers.egresarProductos = async (req, res) => {
    let query = require('url').parse(req.url, true).query;
    jsonResponse = query.jsonResponse;
    if (jsonResponse == "true") {
        const { email, password, dniCliente, codigoBarra, cantidad } = req.body;
        let dni = dniCliente;
        let scanner = codigoBarra;
        let cant = cantidad;

        const user = await Empleado.findOne({ email });
        if (!user) {
            res.sendStatus(403);
        } else {

            const match = await user.matchPassword(password);

            if (match) {

                res.locals.user = user;

                try {
                    jwt.verify(req.token, 'secretkey', async (error, authData) => {
                        if (error) {
                            res.sendStatus(403);
                        } else {
                            try {
                                let esValido = await res.locals.sucursal.egresarProducto(res, dni, scanner, cant);
                                res.status(200).json({ status: 200, productoEgresado: esValido });
                            } catch (e) {
                                res.status(200).json({ message: e.message, notificacion: " Se Genero una Notificacion" })
                            }
                        }
                    });
                } catch (e) {
                    res.status(400).json({ status: 400 });
                }
            }
        }
    } else {
        try {
            const { dniCliente, codigoBarra, cantidad } = req.body;
            let dni = dniCliente;
            let scanner = codigoBarra;
            let cant = cantidad;
            await res.locals.sucursal.egresarProducto(res, dni, scanner, cant);
            req.flash('success_msg', "Se egreso exitosamente");
            res.redirect('/formEgresar');

        } catch (err) {
            await res.locals.sucursal.dispararAlerta(res, err);
            req.flash('error_msg', err.message);
            res.redirect('/formEgresar');
        }
    }
}
module.exports = sucursalesControllers;
