const { celebrate, Joi, Segments } = require('celebrate');
const PostController = require('../Controller/Post');

const idValidation = celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.string().uuid().required(),
  }),
});

const postRoutes = (routes) => {
  routes
    .route('/posts')
    .get(PostController.read)
    .post(
      celebrate({
        [Segments.BODY]: Joi.object().keys({
          message: Joi.string().required(),
          image: Joi.string(),
        }),
      }),
      PostController.create
    );

  routes
    .route('/posts/:id')
    .get(idValidation, PostController.readOne)
    .delete(idValidation, PostController.delete);
};

module.exports = postRoutes;
