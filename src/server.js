const express = require('express');
const handlebars = require('express-handlebars');
const path = require('path');

// Initializations
const app = express();

// Settings
app.set('port', process.env.PORT || 4000);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', handlebars.engine({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs'
}))
app.set('view engine', '.hbs');

// Middlewares
app.use(express.urlencoded({ extended: false }));

// Glabal variables

// Routes
app.use(require('./routers/index.routes'))

// Static files
app.use(express.static(path.join(__dirname, 'public')));

module.exports = app;