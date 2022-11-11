const ProductoSucursal = require('../models/ProductoSucursal');
const ProductoProveedor = require('../models/ProductoProveedor');
const Producto = require('../models/Producto');

const productosController = {};

// Nuevo Prodcuto
productosController.renderizarFormProducto = (req, res) => {
    res.render('producto/nuevoProducto');
}

productosControllers.crearProducto = async (req, res) => {
    try {

        const { idProducto, codigoBarra, nombreCategoria, marca, descripcion, stock,idSucursal,idProveedor,precioVenta,precioCompra,tipoProducto } = req.body;



        let nuevoProducto = null;

        switch (tipoProducto) {
            case 'Producto':
                nuevoProducto = new ProductoSucursal({idProducto, codigoBarra, nombreCategoria, marca, descripcion, stock, idSucursal, precioVenta});
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