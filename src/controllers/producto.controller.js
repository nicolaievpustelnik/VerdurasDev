const ProductoSucursal = require('../models/ProductoSucursal');
const ProductoProveedor = require('../models/ProductoProveedor');
const jwt = require('jsonwebtoken');
const productosControllers = {};

// Renderizar formulario para crear un nuevo producto
productosControllers.renderizarFormProducto = (req, res) => {
    res.render('producto/nuevoProducto');
}

// Crear un nuevo producto
productosControllers.crearProducto = async (req, res) => {
    try {
        const { codigoBarra, nombreCategoria, descripcion, tipoProducto, idSucursal, idProveedor, precioVenta, precioCompra } = req.body;
        
        let stock = 0;
        let nuevoProducto = null;
        const query = require('url').parse(req.url, true).query;
        const jsonResponse = query.jsonResponse === "true";
        
        // Generar ID único y crear producto
        const generarNuevoProducto = async () => {
            let idProducto = null;
            if (tipoProducto === 'Producto') {
                idProducto = await generateUniqueProductoId(ProductoSucursal);
                nuevoProducto = new ProductoSucursal({ idProducto, codigoBarra, nombreCategoria, descripcion, stock, idSucursal, precioVenta });
                return await res.locals.sucursal.agregarProductoSucursal(req, res, nuevoProducto, jsonResponse);
            } else if (tipoProducto === 'Proveedor') {
                idProducto = await generateUniqueProductoId(ProductoProveedor);
                nuevoProducto = new ProductoProveedor({ idProducto, codigoBarra, nombreCategoria, descripcion, stock, idProveedor, precioCompra });
                return await res.locals.sucursal.agregarProductoProveedor(req, res, nuevoProducto, jsonResponse);
            } else {
                throw new Error('Tipo de producto inválido');
            }
        };

        if (jsonResponse) {
            jwt.verify(req.token, 'secretkey', async (error, authData) => {
                if (error) {
                    res.sendStatus(403);
                } else {
                    await generarNuevoProducto();
                    res.status(200).json({ status: 200, producto: nuevoProducto });
                }
            });
        } else {
            const productoAgregado = await generarNuevoProducto();
            if (productoAgregado) {
                req.flash('success_msg', "Producto agregado exitosamente");
            }
            res.redirect('/productos');
        }
    } catch (err) {
        console.log("Error -->", err.message);
    }
}

// Función para generar un ID único para productos de Sucursal o Proveedor
async function generateUniqueProductoId(model) {
    const min = 0;
    const max = 9999;

    let idProducto;
    let exists = true;

    while (exists) {
        idProducto = Math.floor(Math.random() * (max - min + 1)) + min;
        const product = await model.findOne({ idProducto });
        exists = !!product; // Si existe, vuelve a intentar
    }

    return idProducto.toString();
}

// Ver todos los productos
productosControllers.renderizarProductos = async (req, res) => {
    const producSuc = await res.locals.sucursal.listaDeProductosSucursal();
    const producProv = await res.locals.sucursal.listaDeProductosProveedor();
    res.render('producto/productos', { producSuc, producProv });
}

// Renderizar formulario de actualización de producto (Sucursal)
productosControllers.renderizadoActualizarFormProductoSucursal = async (req, res) => {
    const query = require('url').parse(req.url, true).query;
    const id = query.id;
    const producto = await res.locals.sucursal.buscarProductoPorIdSucursal(id);
    res.render('producto/editarProductoSucursal', { producto });
}

// Renderizar formulario de actualización de producto (Proveedor)
productosControllers.renderizadoActualizarFormProductoProveedor = async (req, res) => {
    const query = require('url').parse(req.url, true).query;
    const id = query.id;
    const producto = await res.locals.sucursal.buscarProductoPorIdProveedor(id);
    res.render('producto/editarProductoProveedor', { producto });
}

// Actualizar producto de Sucursal
productosControllers.actualizarProductoSucursal = async (req, res) => {
    await res.locals.sucursal.editarProductoSucursal(req.params.id, req.body);
    req.flash('success_msg', "Producto editado exitosamente");
    res.redirect('/productos');
}

// Actualizar producto de Proveedor
productosControllers.actualizarProductoProveedor = async (req, res) => {
    await res.locals.sucursal.editarProductoProveedor(req.params.id, req.body);
    req.flash('success_msg', "Producto editado exitosamente");
    res.redirect('/productos');
}

// Eliminar producto de Sucursal
productosControllers.eliminarProductoSucursal = (req, res) => {
    const id = req.params.id;
    res.locals.sucursal.eliminarProductoSucursal(id);
    req.flash('success_msg', "Producto eliminado exitosamente");
    res.redirect('/productos');
}

// Eliminar producto de Proveedor
productosControllers.eliminarProductoProveedor = (req, res) => {
    const id = req.params.id;
    res.locals.sucursal.eliminarProductoProveedor(id);
    req.flash('success_msg', "Producto eliminado exitosamente");
    res.redirect('/productos');
}

module.exports = productosControllers;
