const express = require('express');
const handlebars = require('express-handlebars');
const path = require('path');
const morgan = require('morgan');

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

// Variables globales

// Rutas
app.use(require('./routers/index.routes'));
app.use(require('./routers/usuario.routes'));

// Archivos static
app.use(express.static(path.join(__dirname, 'public')));

module.exports = app;