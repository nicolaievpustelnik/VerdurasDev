const Empleado = require("../models/Empleado");
const Admin = require("../models/Admin");

const bcryptjs = require("bcryptjs");
const passport = require("passport");
const jwt = require("jsonwebtoken");

const usuariosControllers = {};

//Auth Token 1 hora
usuariosControllers.auth = async (req, res, done) => {
  const { email, password } = req.body;

  const user = await Empleado.findOne({ email });

  if (!user) {
    res.sendStatus(403);
  } else {
    const match = await user.matchPassword(password);

    if (match) {
      jwt.sign({ user }, "secretkey", { expiresIn: "1h" }, (err, token) => {
        res.status(200).json({
          token,
        });
      });
    } else {
      res.sendStatus(403);
    }
  }
};

// Get usuario por email
usuariosControllers.getUserByEmail = async (req, res) => {
  let query = require("url").parse(req.url, true).query;
  let email = query.email;

  if (email) {
    let usuario = await res.locals.sucursal.buscarUsuarioPorEmail(email);

    jwt.verify(req.token, "secretkey", (error, authData) => {
      if (error) {
        res.sendStatus(403);
      } else {
        res.status(200).json({ status: 200, usuarios: usuario });
      }
    });
  } else {
    res.sendStatus(403);
  }
};

// Nuevo usuario Form
usuariosControllers.renderizarFormUsuario = (req, res) => {
  res.render("usuario/nuevoUsuario");
};

// Nuevo usuario
usuariosControllers.crearUsuario = async (req, res) => {
  try {
    const { nombre, apellido, email, password, sucursal, tipoUsuario, rol } =
      req.body;
    if (!nombre || nombre.length < 3 || /\d/.test(nombre)) {
      req.flash(
        "error_msg",
        "El nombre es incorrecto. Debe tener al menos 3 letras, no puede estar vacío y no debe contener números."
      );
      return res.redirect("/formRegistroUsuario");
    }

    if (!apellido || apellido.length < 3 || /\d/.test(apellido)) {
      req.flash(
        "error_msg",
        "El apellido es incorrecto. Debe tener al menos 3 letras, no puede estar vacío y no debe contener números."
      );
      return res.redirect("/formRegistroUsuario");
    }
    if (!email || !email.includes('@')) {
        errores.push("El email es incorrecto. Debe contener '@' y no puede estar vacío.");
      } else {
        let userEmail = await res.locals.sucursal.buscarUsuarioPorEmail(email);
        if (userEmail.length > 0) {
          errores.push("Email existente");
        }
      }
    if (password != confirmPassword) {
      errores.push({ texto: "La password no coincide" });
    }

    if (password.length == 6) {
      errores.push({ texto: "Password sin caracteres suficientes (6)" });
    }

    if(!sucursal){
        errores.push({ texto: "No existe sucursal" });
    }
    let legajo = await generateLegajo(res);

    let query = require("url").parse(req.url, true).query;
    let jsonResponse = query.jsonResponse;
    let newUser = null;

    switch (tipoUsuario) {
      case "Admin":
        newUser = new Admin({
          legajo,
          nombre,
          apellido,
          email,
          password,
          sucursal,
          tipoUsuario,
        });
        break;

      case "Empleado":
        newUser = new Empleado({
          legajo,
          nombre,
          apellido,
          email,
          password,
          sucursal,
          tipoUsuario,
          rol,
        });
        break;

      default:
        break;
    }

    // Encriptar pass
    newUser.password = await newUser.encryptPassword(password);

    if (jsonResponse == "true") {
      jwt.verify(req.token, "secretkey", async (error, authData) => {
        if (error) {
          res.sendStatus(403);
        } else {
          await res.locals.sucursal.agregarUsuario(req, res, newUser, true);
          res.status(200).json({ status: 200, usuario: newUser });
        }
      });
    } else {
      let userAgregado = await res.locals.sucursal.agregarUsuario(
        req,
        res,
        newUser,
        false
      );

      if (userAgregado) {
        req.flash("success_msg", "Usuario agregado exitosamente");
        res.redirect("/usuarios");
      } else {
        res.redirect("/usuarios");
      }
    }
  } catch (e) {
    console.log(e);
  }
};

// Ver todos los usuarios
usuariosControllers.renderizarUsuarios = async (req, res) => {
  let usuarios = await res.locals.sucursal.listaDeUsuarios();
  let query = require("url").parse(req.url, true).query;
  let jsonResponse = query.jsonResponse;

  if (jsonResponse == "true") {
    jwt.verify(req.token, "secretkey", (error, authData) => {
      if (error) {
        res.sendStatus(403);
      } else {
        res.status(200).json({ status: 200, usuarios: usuarios });
      }
    });
  } else {
    res.render("usuario/usuarios", { usuarios });
  }
};

// Actualizar usuario
usuariosControllers.renderizadoActualizarFormUsuario = async (req, res) => {
  let query = require("url").parse(req.url, true).query;
  let id = query.id;
  let usuario = await res.locals.sucursal.buscarUsuarioPorId(id);
  res.render("usuario/editarUsuario", { usuario });
};

// Actualizar usuario
usuariosControllers.actualizarUsuario = async (req, res) => {
    let usuarios = await res.locals.sucursal.listaDeUsuarios();
    let query = require("url").parse(req.url, true).query;
    let jsonResponse = query.jsonResponse;
    let id = req.params.id;
  
    // Verificar que el usuario autenticado no intente editarse a sí mismo
    if (req.user._id.toString() === id) {
      req.flash("error_msg", "No puedes editar tu propia información.");
      return res.redirect("/usuarios");
    }
  
    if (jsonResponse == "true") {
      jwt.verify(req.token, "secretkey", async (error, authData) => {
        if (error) {
          res.sendStatus(403);
        } else {
          try {
            const updates = { ...req.body };
            
            // Encriptar nueva contraseña si se proporciona
            if (updates.password) {
              const salt = await bcryptjs.genSalt(10);
              updates.password = await bcryptjs.hash(updates.password, salt);
            }
  
            let user = await res.locals.sucursal.editarUsuario(id, updates);
            if (user) {
              res.status(200).json({ status: 200, usuario: updates });
            } else {
              res.sendStatus(403);
            }
          } catch (e) {
            console.error(e);
            res.status(500).json({ status: 500, message: e.message });
          }
        }
      });
    } else {
      try {
        const updates = { ...req.body };
        
        // Encriptar nueva contraseña si se proporciona
        if (updates.password) {
          const salt = await bcryptjs.genSalt(10);
          updates.password = await bcryptjs.hash(updates.password, salt);
        }
  
        await res.locals.sucursal.editarUsuario(id, updates);
        req.flash("success_msg", "Usuario editado exitosamente");
        res.redirect("/usuarios");
      } catch (e) {
        console.error(e);
        req.flash("error_msg", "Error al editar el usuario.");
        res.redirect("/usuarios");
      }
    }
  };
  

// Eliminar usuario
usuariosControllers.eliminarUsuario = async (req, res) => {
  let query = require("url").parse(req.url, true).query;
  let jsonResponse = query.jsonResponse;
  let id = req.params.id;

  // Verificar que el usuario autenticado sea admin
  if (req.user.tipoUsuario !== "Admin" || req.user._id.toString() === id) {
    req.flash(
      "error_msg",
      "No tienes permiso para eliminar usuarios o no puedes eliminar tu propia cuenta."
    );
    return res.redirect("/usuarios");
  }

  if (jsonResponse == "true") {
    jwt.verify(req.token, "secretkey", async (error, authData) => {
      if (error) {
        return res.sendStatus(403);
      } else {
        try {
          await res.locals.sucursal.eliminarUsuario(id);
          res.status(200).json({ status: 200, usuarioId: id });
        } catch (e) {
          console.error(e);
          res.status(500).json({ status: 500, message: e.message });
        }
      }
    });
  } else {
    try {
      await res.locals.sucursal.eliminarUsuario(id);
      req.flash("success_msg", "Usuario eliminado exitosamente");
      res.redirect("/usuarios");
    } catch (e) {
      console.error(e);
      req.flash("error_msg", "Error al eliminar el usuario.");
      res.redirect("/usuarios");
    }
  }
};

usuariosControllers.renderRegistrarUsuarioForm = (req, res) => {
  res.render("usuario/registroUsuario");
};

usuariosControllers.registrarUsuario = async (req, res) => {
  const errores = [];
  const { nombre, apellido, email, password, confirmPassword } = req.body;

  let userEmail = await res.locals.sucursal.buscarUsuarioPorEmail(email);

  if (!nombre || nombre.length < 3 || /\d/.test(nombre)) {
    req.flash(
      "error_msg",
      "El nombre es incorrecto. Debe tener al menos 3 letras, no puede estar vacío y no debe contener números."
    );
    return res.redirect("/formRegistroUsuario");
  }

  if (!apellido || apellido.length < 3 || /\d/.test(apellido)) {
    req.flash(
      "error_msg",
      "El apellido es incorrecto. Debe tener al menos 3 letras, no puede estar vacío y no debe contener números."
    );
    return res.redirect("/formRegistroUsuario");
  }
  if (userEmail.length > 6) {
    req.flash("error_msg", "Email existente");
    res.redirect("/formRegistroUsuario");
  } else {
    if (password != confirmPassword) {
      errores.push({ texto: "La password no coincide" });
    }

    if (password.length ==6) {
      errores.push({ texto: "Password sin caracteres suficientes (6)" });
    }

    if (errores.length > 0) {
      res.render("usuario/registroUsuario", {
        errores,
        nombre,
        apellido,
        email,
      });
    } else {
      let legajo = await generateLegajo(res);

      //Datos por defecto
      let sucursal = 0;
      let tipoUsuario = "Empleado";
      let rol = [];

      newUser = new Empleado({
        legajo,
        nombre,
        apellido,
        email,
        password,
        sucursal,
        tipoUsuario,
        rol,
      });

      // Encriptar pass
      newUser.password = await newUser.encryptPassword(password);

      await res.locals.sucursal.agregarUsuario(req, res, newUser);
      req.flash("success_msg", "Usuario registrado");
      res.redirect("/formLoginUsuario");
    }
  }
};

async function generateLegajo(res) {
  let min = 0;
  let max = 9999;

  do {
    var legajo = Math.floor(Math.random() * (max - min)) + min;
    var castLegajo = legajo.toString();
    var user = await res.locals.sucursal.buscarUsuarioPorLegajo(castLegajo);
  } while (user.lenght > 0);

  return castLegajo;
}

usuariosControllers.renderLoginUsuarioForm = (req, res) => {
  res.render("usuario/loginUsuario");
};

usuariosControllers.loginUsuario = passport.authenticate("local", {
  failureRedirect: "/formLoginUsuario",
  successRedirect: "/",
  failureFlash: true,
});

usuariosControllers.cerrarSesionUsuario = (req, res) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    req.flash("success_msg", "Usuario fuera de sesión");
    res.redirect("/formLoginUsuario");
  });
};

module.exports = usuariosControllers;
