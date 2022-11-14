

const proveedorControllers = {};

// Nuevo usuario
proveedorControllers.renderizarFormProveedor = (req, res) => {
    res.render('proveedor/nuevoProveedor');
}

proveedorControllers.crearProveedor = async (req, res) => {
    try {

        const { cuil, nombre } = req.body;

        let nuevoProveedor = new Proveedor({ cuil, nombre});

        switch (tipoProveedor) {
            case 'Admin':
                newUser = new Admin({ legajo, nombre, apellido, email, password, sucursal, tipoProveedor });
                break;

            case 'Empleado':
                newUser = new Empleado({ legajo, nombre, apellido, email, password, sucursal, tipoProveedor, rol });
                break;

            default:
                break;
        }

        await res.locals.sucursal.agregarProveedor(res, newUser);
        res.redirect('/proveedores');

    } catch (e) {

        console.log(e)
    }
}

// Ver todos los usuarios
usuariosControllers.renderizarUsuarios = async (req, res) => {

    let usuarios = await res.locals.sucursal.listaDeUsuarios()

    res.render('usuario/usuarios', { usuarios });
}

// Actualizar usuario
usuariosControllers.renderizadoActualizarFormUsuario = async (req, res) => {
    let query = require('url').parse(req.url, true).query;
    let id = query.id;
    let usuario = await res.locals.sucursal.buscarUsuarioPorId(id)
    res.render('usuario/editarUsuario', { usuario });
}

usuariosControllers.actualizarUsuario = (req, res) => {
    res.send('Usuario actualizado');
}

// Eliminar usuario
usuariosControllers.eliminarUsuario = (req, res) => {

    let id = req.params.id;
    res.locals.sucursal.eliminarUsuario(id);
    res.redirect('/usuarios');
}

module.exports = usuariosControllers;