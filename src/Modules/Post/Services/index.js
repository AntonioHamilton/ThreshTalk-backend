const { Server } = require('http');
const socketIo = require('socket.io');
const Post = require('../Model');

const postsServer = (server) => {
  const io = socketIo(server);

  io.on('connection', (socket) => {
    socket.on('send posts', async () => {
      const posts = await Post.find().sort('-createdAt');
      io.emit('posts', posts);
    });
  });
};

module.exports = {
  postsServer,
};
