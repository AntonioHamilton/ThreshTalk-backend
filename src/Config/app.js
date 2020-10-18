const express = require('express');
const cors = require('cors');
const { errors } = require('celebrate');
const { Router } = require('express');
const setRoutes = require('./routes');
const swaggerUi = require('swagger-ui-express');
const docs = require('../Docs/documentation.json');

const setApp = () => {
  const app = express();
  app.use(cors());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(errors());
  app.use('/', swaggerUi.serve, swaggerUi.setup(docs));
  setRoutes(app);
  return app;
};

module.exports = setApp;
