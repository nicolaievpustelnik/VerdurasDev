const Empleado = require('../models/Empleado');
const Admin = require('../models/Admin');

const passport = require('passport');

const usuariosControllers = {};

// Nuevo usuario
usuariosControllers.renderizarFormUsuario = (req, res) => {
    res.render('usuario/nuevoUsuario');
}

usuariosControllers.crearUsuario = async (req, res) => {
    try {

        const { legajo, nombre, apellido, email, password, sucursal, tipoUsuario, rol } = req.body;

        let newUser = null;

        switch (tipoUsuario) {
            case 'Admin':
                newUser = new Admin({ legajo, nombre, apellido, email, password, sucursal, tipoUsuario });
                break;

            case 'Empleado':
                newUser = new Empleado({ legajo, nombre, apellido, email, password, sucursal, tipoUsuario, rol });
                break;

            default:
                break;
        }
    
        // Encriptar pass
        newUser.password = await newUser.encryptPassword(password);
    
        await res.locals.sucursal.agregarUsuario(res, newUser);
        req.flash('success_msg', "Usuario agregado exitosamente");
        res.redirect('/usuarios');

    } catch (e) {

        console.log(e)
    }
}

// Ver todos los usuarios
usuariosControllers.renderizarUsuarios = async (req, res) => {
    let usuarios = await res.locals.sucursal.listaDeUsuarios();
    let query = require('url').parse(req.url, true).query;
    let json = query.json;
    if(json){
        res.status(200).json({status: 200, usuarios: usuarios});
    }else{
        res.render('usuario/usuarios', { usuarios });
    }
}

usuariosControllers.usuariosJson = async (req, res) => {
    let usuarios = await res.locals.sucursal.listaDeUsuarios();
    res.status(200).json({status: 200, usuarios: usuarios});
}

// Actualizar usuario
usuariosControllers.renderizadoActualizarFormUsuario = async (req, res) => {
    let query = require('url').parse(req.url, true).query;
    let id = query.id;
    let usuario = await res.locals.sucursal.buscarUsuarioPorId(id)
    res.render('usuario/editarUsuario', { usuario });
}

usuariosControllers.actualizarUsuario = async (req, res) => {
    await res.locals.sucursal.editarUsuario(req.params.id, req.body)
    req.flash('success_msg', "Usuario editado exitosamente");
    res.redirect('/usuarios');
}

// Eliminar usuario
usuariosControllers.eliminarUsuario = (req, res) => {

    let id = req.params.id;
    res.locals.sucursal.eliminarUsuario(id);
    req.flash('success_msg', "Usuario eliminado exitosamente");
    res.redirect('/usuarios');
}


usuariosControllers.renderRegistrarUsuarioForm = (req, res) => {
    res.render('usuario/registroUsuario');
}

usuariosControllers.registrarUsuario = async (req, res) => {

    const errores = [];
    const { nombre, apellido, email, password, confirmPassword} = req.body;

    let userEmail = await res.locals.sucursal.buscarUsuarioPorEmail(email);

    if(userEmail.length > 0){
        req.flash('error_msg', "Email existente");
        res.redirect('/formRegistroUsuario');

    }else{

        if(password != confirmPassword){

            errores.push({texto: "La password no coincide"})
        }
    
        if(password.length < 8){
    
            errores.push({texto: "Password sin caracteres suficientes (Min 8)"})
        }
    
        if(errores.length > 0){
    
            res.render('usuario/registroUsuario', {
                errores, 
                nombre, 
                apellido, 
                email
            });
    
        }else{
    
            do {
                var legajo = generateLegajo();
                var user = await res.locals.sucursal.buscarUsuarioPorLegajo(legajo);    
            } while (user.lenght > 0);
    
            //Datos por defecto
            let sucursal = 0;
            let tipoUsuario = "Empleado"
            let rol = [];
            
            newUser = new Empleado({ legajo, nombre, apellido, email, password, sucursal, tipoUsuario, rol });
    
            // Encriptar pass
            newUser.password = await newUser.encryptPassword(password);
    
            await res.locals.sucursal.agregarUsuario(res, newUser);
            req.flash('success_msg', "Usuario registrado");
            res.redirect('/formLoginUsuario');
        }
    }
}

function generateLegajo() {
    let min = 0000;
    let max = 9999;
    return Math.floor(Math.random() * (max - min)) + min;
}

usuariosControllers.renderLoginUsuarioForm = (req, res) => {
    res.render('usuario/loginUsuario');
}

usuariosControllers.loginUsuario = passport.authenticate('local', {
    failureRedirect: '/formLoginUsuario',
    successRedirect: '/',
    failureFlash: true
});

usuariosControllers.cerrarSesionUsuario = (req, res) => {
    req.logout(function(err) {
        if (err) { return next(err); }
        req.flash('success_msg', "Usuario fuera de sesión");
        res.redirect('/formLoginUsuario');
    });
    
}

module.exports = usuariosControllers;