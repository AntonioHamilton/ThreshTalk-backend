const express = require('express');
const cors = require('cors');
const http = require('http');
const setRoutes = require('./routes');
const { postsServer } = require('../Modules/Post/Services');

const setApp = () => {
  const app = express();
  const server = http.createServer(app);
  app.use(cors());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  setRoutes(app);
  postsServer(server);
  return server;
};

module.exports = setApp;
