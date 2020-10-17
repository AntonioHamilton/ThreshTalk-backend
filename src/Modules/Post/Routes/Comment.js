const { celebrate, Joi, Segments } = require('celebrate');
const CommentController = require('../Controller/Comment');

const idValidation = celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.string().uuid().required(),
  }),
});

const commentRoutes = (routes) => {
  routes
    .route('/posts/:id/comments')
    .get(idValidation, CommentController.readComments)
    .post(
      celebrate({
        [Segments.PARAMS]: Joi.object().keys({
          id: Joi.string().uuid().required(),
        }),
        [Segments.BODY]: Joi.object().keys({
          comment: Joi.string().required(),
        }),
      }),
      CommentController.addComment
    );
};

module.exports = commentRoutes;
