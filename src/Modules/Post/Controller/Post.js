const Post = require('../Model');

module.exports = {
  create(req, res) {
    const { message, image } = req.body;
    return Post.create({
      message,
      image,
    })
      .then(() => {
        return res.status(201).send({ message: 'Post created' });
      })
      .catch((err) => {
        return res.status(500);
      });
  },

  read(req, res) {
    return Post.find()
      .sort('-createdAt')
      .select({ createdAt: 0, updatedAt: 0, __v: 0, _id: 0 })
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
};
