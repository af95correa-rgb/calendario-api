const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const path = require('path');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API de Festivos',
      version: '1.0.0',
      description: 'Documentación de la API para el manejo de festivos',
    },
    servers: [
      {
        url: 'http://localhost:3030',
      },
    ],
  },
  apis: [path.join(__dirname, '../rutas/*.js')], // Ruta a tus archivos con anotaciones Swagger
};

const swaggerSpec = swaggerJSDoc(options);

function swaggerDocs(app) {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}

module.exports = swaggerDocs;
