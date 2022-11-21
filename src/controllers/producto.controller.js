const ProductoSucursal = require('../models/ProductoSucursal');
const ProductoProveedor = require('../models/ProductoProveedor');

const jwt = require('jsonwebtoken');

const productosControllers = {};

// Nuevo Prodcuto
productosControllers.renderizarFormProducto = (req, res) => {
    res.render('producto/nuevoProducto');
}

productosControllers.crearProducto = async (req, res) => {
    
    try {

        const { codigoBarra, nombreCategoria, marca, descripcion, tipoProducto, idSucursal, idProveedor, precioVenta, precioCompra } = req.body;
        
        let stock = 0;
        let nuevoProducto = null;
        let query = require('url').parse(req.url, true).query;
        let jsonResponse = query.jsonResponse;

        if(jsonResponse == "true"){

            jwt.verify(req.token, 'secretkey', async (error, authData) => {
                if (error) {
                    res.sendStatus(403);
                } else {
                    switch (tipoProducto) {
                        case 'Producto':
                            var idProducto = await generateProductoIdSucursal(res);
                            nuevoProducto = new ProductoSucursal({ idProducto, codigoBarra, nombreCategoria, marca, descripcion, stock, idSucursal, precioVenta});
                            await res.locals.sucursal.agregarProductoSucursal(req, res, nuevoProducto, true);
                            res.status(200).json({status: 200, producto: nuevoProducto});
                            break;
            
                        case 'Proveedor':
                            var idProducto = await generateProductoIdProveedor(res);
                            nuevoProducto = new ProductoProveedor({ idProducto, codigoBarra, nombreCategoria, marca, descripcion, stock, idProveedor, precioCompra});
                            await res.locals.sucursal.agregarProductoProveedor(req, res, nuevoProducto, true);
                            res.status(200).json({status: 200, producto: nuevoProducto});
                            break;
            
                        default:
                            break;
                    }
                }
            });
    
        }else{

            let productoAgregado = null;

            switch (tipoProducto) {
                case 'Producto':
                    var idProducto = await generateProductoIdSucursal(res);
                    nuevoProducto = new ProductoSucursal({ idProducto, codigoBarra, nombreCategoria, marca, descripcion, stock, idSucursal, precioVenta});
                    productoAgregado = await res.locals.sucursal.agregarProductoSucursal(req, res, nuevoProducto, false);
                    break;
    
                case 'Proveedor':
                    var idProducto = await generateProductoIdProveedor(res);
                    nuevoProducto = new ProductoProveedor({ idProducto, codigoBarra, nombreCategoria, marca, descripcion, stock, idProveedor, precioCompra});
                    productoAgregado = await res.locals.sucursal.agregarProductoProveedor(req, res, nuevoProducto, false);
                    break;
    
                default:
                    break;
            }
            
            if (productoAgregado) {
                req.flash('success_msg', "Producto agregado exitosamente");
                res.redirect('/productos');
            } else{
                res.redirect('/productos');  
            }
        }  
        

    } catch (err) {

        console.log(err.name +" --> "+err.message)
    }
}

async function generateProductoIdSucursal(res) {
    let min = 0000;
    let max = 9999;

    do {
        var num = Math.floor(Math.random() * (max - min)) + min;
        var user = await res.locals.sucursal.buscarProductoIdSucursal(num);    
    } while (user.lenght > 0);
    
    return num.toString();
}

async function generateProductoIdProveedor(res) {
    let min = 0000;
    let max = 9999;

    do {
        var num = Math.floor(Math.random() * (max - min)) + min;
        var user = await res.locals.sucursal.buscarProductoIdProveedor(num);    
    } while (user.lenght > 0);
    
    return num.toString();
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
productosControllers.eliminarProductoSucursal = (req, res) => {
    let id = req.params.id;
    res.locals.sucursal.eliminarProductoSucursal(id);
    req.flash('success_msg', "Producto eliminado exitosamente");
    res.redirect('/productos');
}

productosControllers.eliminarProductoProveedor = (req, res) => {
    let id = req.params.id;
    res.locals.sucursal.eliminarProductoProveedor(id);
    req.flash('success_msg', "Producto eliminado exitosamente");
    res.redirect('/productos');
}

module.exports = productosControllers;