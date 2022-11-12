const ProductoSucursal = require('../models/ProductoSucursal');
const ProductoProveedor = require('../models/ProductoProveedor');
const Producto = require('../models/Producto');

const productosControllers = {};

// Nuevo Prodcuto
productosControllers.renderizarFormProducto = (req, res) => {
    res.render('producto/nuevoProducto');
}

productosControllers.crearProducto = async (req, res) => {
    try {

        const { codigoBarra, nombreCategoria, marca, descripcion, stock,idSucursal,idProveedor,precioVenta,precioCompra,tipoProducto } = req.body;



        let nuevoProducto = null;

        switch (tipoProducto) {
            case 'Producto':
                nuevoProducto = new ProductoSucursal({ codigoBarra, nombreCategoria, marca, descripcion, stock, idSucursal, precioVenta});
                break;

            case 'Proveedor':
                nuevoProducto = new ProductoProveedor({ codigoBarra, nombreCategoria, marca, descripcion, stock,idProveedor, precioCompra});
                break;

            default:
                break;
        }

        await nuevoProducto.save();

        res.send('Producto agregado');

    } catch (err) {

        console.log(err.name +" --> "+err.message)
    }
}

// Ver todos los producto
productosControllers.renderizarProductos = async (req, res) => {
    let productos = await res.locals.sucursal.listaDeProductos()
    res.render('producto/productos', { productos });
}

// Actualizar producto
productosControllers.renderizadoActualizarFormUsuario = async (req, res) => {
    let query = require('url').parse(req.url, true).query;
    let id = query.id;
    let producto = await res.locals.sucursal.buscarProductoPorId(id)
    res.render('Producto/editarProductp', { producto });
}

productosControllers.actualizarProducto = (req, res) => {
    res.send('Producto actualizado');
}

// Eliminar usuario
productosControllers.eliminarProducto= (req, res) => {

    let id = req.params.id;
    res.locals.sucursal.eliminarProducto(id);
    res.redirect('/productos');
}

module.exports = productosControllers;