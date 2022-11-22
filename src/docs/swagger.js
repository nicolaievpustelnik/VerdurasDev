const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

// Metadata APIS
const options = {
    failOnErrors: true,
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'Verduras Dev',
        version: '1.0.0',
      },
    },
    //apis: ['../routes*.js', 'src/routers/usuario.routes.js'],
    apis: ['src/routers/*.routes.js'],
};

const swaggerSpec = swaggerJsdoc(options);

const swaggerDocs = (app, port) => {
    app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
    app.get('/docs.json', (req, res) => {
        res.setHeader('Contemt-Type', 'application/json');
        res.send(swaggerSpec);
    });

    console.log('Docs');
}

module.exports = swaggerDocs;