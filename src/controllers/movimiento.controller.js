const Movimiento = require('../models/Movimiento');

const movimientoControllers = {}

movimientoControllers.crearMovimiento = async (req, res) => {
    try {

        const { cant,descripcionProducto,nombreProveedor,monto } = req.body;

        let nuevoMovimiento = new Movimiento({ cant,descripcionProducto,nombreProveedor,monto });

        await nuevoMovimiento.save();

        res.send('Movimiento agregado');

    } catch (e) {

        console.log(e)
    }
}

