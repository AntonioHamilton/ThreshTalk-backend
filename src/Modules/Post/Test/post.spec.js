const request = require('supertest');
const app = require('../../../Config/app')();
const databaseHelper = require('../../../Helpers/databaseHelper');
const uuid = require('node-uuid');

const Post = require('../Model');

describe('integration tests of posts', () => {
  beforeAll(async () => {
    await databaseHelper.openConnection();
    await Post.deleteMany({});
  });

  describe('created post tests', () => {
    test('Should create a new post', async () => {
      const res = await request(app).post('/posts').send({
        image: 'any_string_image',
        message: 'any_message',
      });
      expect(res.status).toBe(201);
    });

    test('Should not create a post with a customized id', async () => {
      const res = await request(app).post('/posts').send({
        id: uuid.v1(),
        image: 'any_string_image',
        message: 'any_message',
      });
      expect(res.status).toBe(500);
    });

    test('Should not create a post without message', async () => {
      const res = await request(app).post('/posts').send({
        image: 'any_string_image',
      });
      expect(res.status).toBe(500);
    });
  });

  describe('read post tests', () => {
    test('Should return all posts', async () => {
      const res = await request(app).get('/posts');
      expect(res.status).toBe(200);
    });
  });

  describe('readOne post tests', () => {
    test('Should create a post and return it', async () => {
      const allPosts = await request(app).get('/posts');
      const id = allPosts.body[0].id;
      const res = await request(app).get(`/posts/${id}`);
      expect(res.status).toBe(200);
    });

    test('Should not get post with an nonexistent post id', async () => {
      const id = uuid.v1();
      const res = await request(app).get(`/posts/${id}`);
      expect(res.status).toBe(404);
    });

    test('Should not get post without a id non-typed as uuid', async () => {
      const id = 1;
      const res = await request(app).get(`/posts/${id}`);
      expect(res.status).toBe(500);
    });
  });

  describe('delete post tests', () => {
    test('Should delete one post', async () => {
      const allPosts = await request(app).get('/posts');
      const id = allPosts.body[0].id;
      const res = await request(app).delete(`/posts/${id}`);
      expect(res.status).toBe(200);
    });
  });

  afterAll(async () => {
    await Post.deleteMany({});
    await databaseHelper.closeConnection();
  });
});
