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

// Ver todos los movimientos
notificacionesControllers.renderizarMovimientos = async (req, res) => {

  // let usuarios = await res.locals.sucursal.listaDeNotificaciones();
  // let query = require('url').parse(req.url, true).query;
  // let jsonResponse = query.jsonResponse;

  // if(jsonResponse == "true"){

  //     jwt.verify(req.token, 'secretkey', (error, authData) => {
  //         if (error) {
  //             res.sendStatus(403);
  //         } else {
  //             res.status(200).json({status: 200, movimientos: movimientos});
  //         }
  //     });

  // }else{
  //     res.render('movimiento/movimientos', { movimientos });
  // }   
}
// Actualizar Movimiento
notificacionesControllers.renderizadoActualizarFormMovimientos = async (req, res) => {
  // let query = require('url').parse(req.url, true).query;
  // let id = query.id;
  // console.log(id)
  // let movimiento = await res.locals.sucursal.buscarMovimientoPorId(id);
  // res.render('proveedor/editarMovimiento', { movimiento });
}

notificacionesControllers.actualizarNotificacion = async (req, res) => {

  let notificaciones = await res.locals.sucursal.listaDeNotificaciones();
  let query = require('url').parse(req.url, true).query;
  let jsonResponse = query.jsonResponse;

  if(jsonResponse == "true"){

      jwt.verify(req.token, 'secretkey', async (error, authData) => {
          if (error) {
              res.sendStatus(403);
          } else {


            
              let user = await res.locals.sucursal.editarNotificacion(req.params.id, req.body)
              if (user) {
                  res.status(200).json({status: 200, usuario: req.body});    
              }else{
                  res.sendStatus(403);
              }
          }
      });

  }else{

      await res.locals.sucursal.editarNotificacion(req.params.id, req.body)
      req.flash('success_msg', "Notificacion editada exitosamente");
      res.redirect('/notificaciones');
  } 
  
}

// Eliminar notificaciones
notificacionesControllers.elimarNotificacion = (req, res) => {

  let query = require('url').parse(req.url, true).query;
  let jsonResponse = query.jsonResponse;
  let id = req.params.id;

  if(jsonResponse == "true"){

      jwt.verify(req.token, 'secretkey', (error, authData) => {
          if (error) {
              res.sendStatus(403);
          } else {
              res.locals.sucursal.eliminarNotificacion(id);
              res.status(200).json({status: 200, usuarioId: id});
          }
      });

  }else{
      res.locals.sucursal.eliminarNotificacion(id);
      req.flash('success_msg', "Notificacion eliminada exitosamente");
      res.redirect('/notificaciones');
  }
  
}

module.exports = notificacionesControllers;
