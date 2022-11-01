const movimientoControllers = {}

const Movimiento = require('../models/Movimiento');


movimientoControllers.crearMovimiento = async (req, res) => {
    try {

        const { idMovimiento, monto, fecha } = req.body;

        let nuevoMovimiento = new Movimiento({ idMovimiento, monto, fecha });

        await nuevoMovimiento.save();

        res.send('Movimiento agregado');

    } catch (e) {

        console.log(e)
    }
}

