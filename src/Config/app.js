const express = require('express');
const cors = require('cors');
const { errors } = require('celebrate');
const { Router } = require('express');
const setRoutes = require('./routes');

const setApp = () => {
  const app = express();
  app.use(cors());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(errors());
  setRoutes(app);
  return app;
};

module.exports = setApp;
