const ProductoSucursal = require('../models/ProductoSucursal');

// Nuevo Prodcuto
usuariosControllers.renderizarFormUsuario = (req, res) => {
    res.render('usuario/nuevoUsuario');
}

usuariosControllers.crearUsuario = async (req, res) => {
    try {

        const { nombre, apellido, email, password, sucursal, tipoUsuario, rol } = req.body;

        let newUser = null;

        switch (tipoUsuario) {
            case 'Admin':
                newUser = new Admin({ nombre, apellido, email, password, sucursal, tipoUsuario });
                break;

            case 'Empleado':
                newUser = new Empleado({ nombre, apellido, email, password, sucursal, tipoUsuario, rol });
                break;

            default:
                break;
        }

        await newUser.save();

        res.send('Usuario agregado');

    } catch (e) {

        console.log(e)
    }
}