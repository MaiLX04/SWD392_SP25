import swaggerAutogen from 'swagger-autogen';

const doc = {
  info: {
    title: 'My API',
    description: 'A sample API for demonstration',
    version: '1.0.0',
  },
  host: 'localhost:3000',
  schemes: ['http'],
};

const outputFile = './swagger-output.json';
const routes = ['./index.js', './src/routes/users.routers.js', './src/routes/accessories.routes.js'];

swaggerAutogen(outputFile, routes, doc);