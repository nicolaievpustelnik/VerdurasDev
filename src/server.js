const express = require('express');
const handlebars = require('express-handlebars');
const path = require('path');
const morgan = require('morgan');
const methodOverride = require('method-override');
var session = require('express-session')

const Sucursal = require('./Sucursal');

const { SUC_ID, SUC_NOMBRE, SUC_DIRECCION } = process.env;

// Inicializacion
const app = express();

// Configuraciones
app.set('port', process.env.PORT || 4000);

app.set('views', path.join(__dirname, 'views'));
app.set('usuario', path.join(__dirname, 'usuario'));

app.engine('.hbs', handlebars.engine({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    usuarioDir: path.join(app.get('views'), 'usuario'),
    extname: '.hbs'
}))
app.set('view engine', '.hbs');

// Middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'))

// Variables globales
app.use((req, res, next) => {
    res.locals.sucursal = new Sucursal({ idSucursal: SUC_ID, nombreSucursal: SUC_NOMBRE, ubicacion: SUC_DIRECCION });
    next();
});

// Rutas
app.use(require('./routers/index.routes'));
app.use(require('./routers/usuario.routes'));

// Archivos static
app.use(express.static(path.join(__dirname, 'public')));

module.exports = app;