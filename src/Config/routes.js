const { Router } = require('express');
const { CommentRoutes, PostRoutes } = require('../Modules/Post/Routes');
const swaggerUi = require('swagger-ui-express');
const docs = require('../Docs/documentation.json');

const setRoutes = (app) => {
  const router = Router();
  CommentRoutes(router);
  PostRoutes(router);
  app.use('/doc', swaggerUi.serve, swaggerUi.setup(docs));
  app.use(router);
};

module.exports = setRoutes;
