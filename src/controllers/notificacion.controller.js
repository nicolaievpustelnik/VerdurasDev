const Notificacion = require("../models/Notificacion");

const notificacionesControllers = {};

// Nuevo Proveedor
notificacionesControllers.renderizarFormNotificacion = (req, res) => {
  res.render("notificacion/nuevaNotificacion");
};

notificacionesControllers.crearNotificacion = async (req, res) => {
  try {
    const { nombreCompletoEmpleado, mensaje, fecha } = req.body;
    let nuevaNotificacion = null;
    nuevaNotificacion = new Notificacion({
      nombreCompletoEmpleado,
      mensaje,
      fecha,
    });

    await res.locals.sucursal.agregarNotificacion(res, nuevaNotificacion);
    res.redirect("/notificaciones");
  } catch (e) {
    console.log(e);
  }
};

// Ver todos los Notificaciones
notificacionesControllers.renderizarNotificaciones = async (req, res) => {
  let notificaciones = await res.locals.sucursal.listaDeNotificaciones();
  res.render("notificacion/notificaciones", { notificaciones });
};

// Actualizar Notificacion
notificacionesControllers.renderizadoActualizarFormNotificacion = async (req,res) => {
  let query = require("url").parse(req.url, true).query;
  let id = query.id;
  let notificacion = await res.locals.sucursal.buscarNotificacionPorId(id);
  res.render("notificacion/editarNotificacion", { notificacion });
};

notificacionesControllers.actualizarNotificacion = (req, res) => {
  res.send("Notificacion actualizado");
};

// Eliminar Notificacion
notificacionesControllers.eliminarNotificacion = (req, res) => {
  let id = req.params.id;
  res.locals.sucursal.eliminarNotificacion(id);
  res.redirect("/notificaciones");
};

module.exports = notificacionesControllers;
