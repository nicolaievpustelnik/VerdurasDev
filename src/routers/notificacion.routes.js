const { Router } = require("express");
const router = Router();

const {
  renderizarFormNotificacion,
  crearNotificacion,
  renderizarNotificaciones,
  renderizadoActualizarFormNotificacion,
  actualizarNotificacion,
  eliminarNotificacion,
} = require("../controllers/notificacion.controller");

// Nuevo Notificacion
router.get("/formNotificacion", renderizarFormNotificacion);
router.post("/nuevaNotificacion", crearNotificacion);

// Ver todos las notificaciones
router.get("/notificacion", renderizarNotificaciones);

// Editar notificacion
router.get("/editarNotificacion", renderizadoActualizarFormNotificacion);
router.put("/actualizarNotificacion/:id", actualizarNotificacion);

// Eliminar notificacion
router.delete("/eliminarNotificacion/:id", eliminarNotificacion);

module.exports = router;
