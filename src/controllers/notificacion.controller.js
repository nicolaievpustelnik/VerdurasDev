const Notificacion = require("../models/Notificacion");

const notificacionControllers = {};

notificacionControllers.crearNotificacion = async (req, res) => {
  try {
    const { nombreCompletoEmpleado, errorMensaje, fecha } = req.body;

    let nuevaNotificacion = new Notificacion({
      nombreCompletoEmpleado,
      errorMensaje,
      fecha,
    });

    await nuevaNotificacion.save();

    res.send("Notificacion agregada");
  } catch (e) {
    console.log(e);
  }
};
