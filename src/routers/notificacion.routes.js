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
router.get("/formNotificacion", isAuthenticated, renderizarFormNotificacion);
router.post("/nuevaNotificacion", crearNotificacion);

// Ver todos las notificaciones
router.get("/notificaciones", renderizarNotificaciones);

// Editar notificacion
router.get("/editarNotificacion", renderizadoActualizarFormNotificacion);
router.put("/actualizarNotificacion/:id", actualizarNotificacion);

// Eliminar notificacion
router.delete("/eliminarNotificacion/:id", eliminarNotificacion);

module.exports = router;
