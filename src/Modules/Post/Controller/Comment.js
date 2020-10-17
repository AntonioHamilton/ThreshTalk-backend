const Post = require('../Model');

module.exports = {
  addComment(req, res) {
    const { id } = req.params;
    const { comment } = req.body;
    return Post.findOne({ id })
      .select({ comments: 1 })
      .then((result) => {
        Post.updateOne(
          { id },
          {
            comments: [...result.comments, comment],
          }
        ).then(() => {
          return res.status(200).send({ message: 'A new comment was made' });
        });
      })
      .catch((err) => {
        console.log(err);
        return res.status(500);
      });
  },

  readComments(req, res) {
    const { id } = req.params;
    return Post.findOne({ id })
      .select({ comments: 1, _id: 0 })
      .then((comments) => {
        if (!comments) {
          return res.status(404).send({ message: 'Not Found' });
        }
        return res.status(200).send(comments);
      })
      .catch((err) => {
        console.log(err);
        return res.status(500);
      });
  },
};
