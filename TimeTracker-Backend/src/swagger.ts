import path from 'path';

const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Time Tracker',
    description: 'A time tracker application to track time across small scale personal projects'
  },
  host: 'localhost:3000',
  schemes: ['http']
};

const outputFile = './swagger.json';
const endpointsFiles = [path.join(__dirname, 'app.ts')];
swaggerAutogen()(outputFile, endpointsFiles, doc);

/* NOTE: if you use the express Router, you must pass in the
   'endpointsFiles' only the root file where the route starts,
   such as index.js, app.js, routes.js, ... */

swaggerAutogen(outputFile, endpointsFiles, doc);
