const ProductoSucursal = require('../models/ProductoSucursal');
const ProductoProveedor = require('../models/ProductoProveedor');

const productosControllers = {};

// Nuevo Prodcuto
productosControllers.renderizarFormProducto = (req, res) => {
    res.render('producto/nuevoProducto');
}

productosControllers.crearProducto = async (req, res) => {
    
    try {

        const { codigoBarra, nombreCategoria, marca, descripcion, tipoProducto, idSucursal, idProveedor, precioVenta, precioCompra } = req.body;
        
        let stock = 0;
        let idProducto = 0;
        let nuevoProducto = null;

        switch (tipoProducto) {
            case 'Producto':
                nuevoProducto = new ProductoSucursal({ idProducto, codigoBarra, nombreCategoria, marca, descripcion, stock, idSucursal, precioVenta});
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
    let producSuc = await res.locals.sucursal.listaDeProductosSucursal();
    let producProv = await res.locals.sucursal.listaDeProductosProveedor();
    res.render('producto/productos', { producSuc, producProv });
}

// Actualizar producto
productosControllers.renderizadoActualizarFormProductoSucursal = async (req, res) => {
    let query = require('url').parse(req.url, true).query;
    let id = query.id;
    let producto = await res.locals.sucursal.buscarProductoPorIdSucursal(id)
    res.render('producto/editarProductoSucursal', { producto });
}
productosControllers.renderizadoActualizarFormProductoProveedor = async (req, res) => {
    let query = require('url').parse(req.url, true).query;
    let id = query.id;
    let producto = await res.locals.sucursal.buscarProductoPorIdProveedor(id)
    res.render('producto/editarProductoProveedor', { producto });
}

productosControllers.actualizarProductoSucursal = async (req, res) => {
    await res.locals.sucursal.editarProductoSucursal(req.params.id, req.body)
    req.flash('success_msg', "Producto editado exitosamente");
    res.redirect('/productos');
}
productosControllers.actualizarProductoProveedor = async (req, res) => {
    await res.locals.sucursal.editarProductoProveedor(req.params.id, req.body)
    req.flash('success_msg', "Producto editado exitosamente");
    res.redirect('/productos');
}

// Eliminar usuario
productosControllers.eliminarProducto = (req, res) => {

    let id = req.params.id;
    res.locals.sucursal.eliminarProducto(id);
    req.flash('success_msg', "Producto eliminado exitosamente");
    res.redirect('/productos');
}

module.exports = productosControllers;