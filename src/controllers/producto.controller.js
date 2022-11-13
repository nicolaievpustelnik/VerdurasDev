const ProductoSucursal = require('../models/ProductoSucursal');
const ProductoProveedor = require('../models/ProductoProveedor');

const productosControllers = {};

// Nuevo Prodcuto
productosControllers.renderizarFormProducto = (req, res) => {
    res.render('producto/nuevoProducto');
}

productosControllers.crearProducto = async (req, res) => {
    
    try {

        const { codigoBarra, nombreCategoria, marca, descripcion, tipoProducto, sucursal, precioVenta } = req.body;
        
        let stock = 0;
        let idProducto = 0;
        let nuevoProducto = null;

        switch (tipoProducto) {
            case 'Producto':
                nuevoProducto = new ProductoSucursal({ idProducto, codigoBarra, nombreCategoria, marca, descripcion, stock, sucursal, precioVenta});
                break;

            case 'Proveedor':
                nuevoProducto = new ProductoProveedor({ idProducto, codigoBarra, nombreCategoria, marca, descripcion, stock, idProveedor, precioCompra});
                break;

            default:
                break;
        }

        await res.locals.sucursal.agregarProducto(res, nuevoProducto);
        res.redirect('/productos');

    } catch (err) {

        console.log(err.name +" --> "+err.message)
    }
}

// Ver todos los productos
productosControllers.renderizarProductos = async (req, res) => {
    let productos = await res.locals.sucursal.listaDeProductos()
    res.render('producto/productos', { productos });
}

// Actualizar producto
productosControllers.renderizadoActualizarFormProducto = async (req, res) => {
    let query = require('url').parse(req.url, true).query;
    let id = query.id;
    let producto = await res.locals.sucursal.buscarProductoPorId(id)
    res.render('producto/editarProducto', { producto });
}

productosControllers.actualizarProducto = (req, res) => {
    res.send('Producto actualizado');
}

// Eliminar usuario
productosControllers.eliminarProducto = (req, res) => {

    let id = req.params.id;
    res.locals.sucursal.eliminarProducto(id);
    res.redirect('/productos');
}

module.exports = productosControllers;