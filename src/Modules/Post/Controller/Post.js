const Post = require('../Model');
const uuid = require('node-uuid');

module.exports = {
  create(req, res) {
    const { message, image } = req.body;

    return Post.create({
      id: uuid.v1(),
      message,
      image,
    })
      .then(() => {
        return res.status(201).send({ message: 'Post created' });
      })
      .catch((err) => {
        if (err.code === 11000) {
          return res
            .status(400)
            .send({ message: 'Um post com esse id já foi criado' });
        }
        return res.status(500);
      });
  },

  read(req, res) {
    return Post.find()
      .select({ updatedAt: 0, __v: 0, _id: 0 })
      .sort('-createdAt')
      .then((data) => {
        return res.status(200).send(data);
      })
      .catch((err) => {
        return res.status(500);
      });
  },

  readOne(req, res) {
    const { id } = req.params;
    return Post.findOne({ id })
      .select({ createdAt: 0, updatedAt: 0, __v: 0, _id: 0 })
      .then((data) => {
        if (!data) {
          return res.status(404).send({ message: 'Not Found' });
        }
        return res.status(200).send(data);
      })
      .catch((err) => {
        return res.status(500);
      });
  },

  delete(req, res) {
    const { id } = req.params;
    return Post.deleteOne({ id })
      .then((data) => {
        return res.status(200).send({ message: 'O post foi deletado!' });
      })
      .catch((err) => {
        return res
          .status(404)
          .send({ message: 'Um post com esse id não existe' });
      });
  },
};
