const express = require('express');
const handlebars = require('express-handlebars');
const path = require('path');
const morgan = require('morgan');
const methodOverride = require('method-override');
const session = require('express-session');
const flash = require('connect-flash');

const Sucursal = require('./Sucursal');

const { SUC_ID, SUC_NOMBRE, SUC_DIRECCION } = process.env;

// Inicializacion
const app = express();

// Configuraciones
app.set('port', process.env.PORT || 4001);

app.set('views', path.join(__dirname, 'views'));
app.set('usuario', path.join(__dirname, 'usuario'));
app.set('producto', path.join(__dirname, 'producto'));
app.set('proveedor', path.join(__dirname, 'proveedor'));

app.engine('.hbs', handlebars.engine({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    usuarioDir: path.join(app.get('views'), 'usuario'),
    productoDir: path.join(app.get('views'), 'producto'),
    proveedorDir: path.join(app.get('views'), 'proveedor'),
    extname: '.hbs',

    helpers:{

        ifCond: function(v1, v2, options) {
        
            if(v1 == v2) {
                return options.fn(this);
            }

            return options.inverse(this);
        }
    }

}))
app.set('view engine', '.hbs');

// Middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));
app.use(flash());

// Config Suc
const suc = new Sucursal({ idSucursal: SUC_ID, nombreSucursal: SUC_NOMBRE, ubicacion: SUC_DIRECCION });
setSucursal(suc);

// Set Sucursal
async function setSucursal(suc) {

    let sucExistente = await Sucursal.find({"idSucursal":suc.idSucursal});

    if (sucExistente.length == 0) {
        await suc.save();
    } 
}

async function verSucursal() {
    return await Sucursal.find({"idSucursal":12345});
}

// Variables globales
app.use((req, res, next) => {
    res.locals.sucursal = suc;
    next();
});

// Rutas
app.use(require('./routers/index.routes'));
app.use(require('./routers/usuario.routes'));
app.use(require('./routers/producto.routes'));
app.use(require('./routers/proveedor.routes'));

// Archivos static
app.use(express.static(path.join(__dirname, 'public')));

module.exports = app;