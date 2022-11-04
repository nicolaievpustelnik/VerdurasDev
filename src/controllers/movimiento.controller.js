const Movimiento = require('../models/Movimiento');

const movimientoControllers = {}

movimientoControllers.crearMovimiento = async (req, res) => {
    try {

        const { cant,descripcionProducto,nombreEnte,monto } = req.body;

        let nuevoMovimiento = new Movimiento({ cant,descripcionProducto,nombreEnte,monto,tipo });

        await nuevoMovimiento.save();

        res.send('Movimiento agregado');

    } catch (e) {

        console.log(e)
    }
}

