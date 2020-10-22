const { Mongoose } = require('mongoose');

const mongoose = require('mongoose');
var uuid = require('node-uuid');

const PostSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      unique: true,
      required: true,
      default: uuid.v1(),
    },
    message: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    comments: {
      type: Array,
      default: [],
    },
  },
  {
    timestamps: {
      updatedAt: true,
      createdAt: true,
    },
  }
);

module.exports = mongoose.model('Post', PostSchema);
