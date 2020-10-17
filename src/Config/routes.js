const { Router } = require('express');
const { CommentRoutes, PostRoutes } = require('../Modules/Post/Routes');

const setRoutes = (app) => {
  const router = Router();
  CommentRoutes(router);
  PostRoutes(router);
  app.use(router);
};

module.exports = setRoutes;
