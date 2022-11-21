const { Router } = require("express");
const router = Router();

const {isAuthenticated, verifyToken} = require('../helps/auth');

const {
  renderizarFormNotificacion,
  crearNotificacion,
  renderizarNotificaciones,
  renderizadoActualizarFormNotificacion,
  actualizarNotificacion,
  eliminarNotificacion,
} = require("../controllers/notificacion.controller");

// Nuevo Notificacion
router.get("/formNotificacion", isAuthenticated,  renderizarFormNotificacion);
router.post("/nuevaNotificacion", verifyToken, crearNotificacion);

// Ver todos las notificaciones
//router.get("/notificaciones", verifyToken, isAuthenticated, renderizarNotificaciones);

// Editar notificacion
//router.get("/editarNotificacion",isAuthenticated, renderizadoActualizarFormNotificacion);
router.put("/actualizarNotificacion/:id", verifyToken, actualizarNotificacion);

// Eliminar notificacion
//router.delete("/eliminarNotificacion/:id", verifyToken, eliminarNotificacion);

module.exports = router;
