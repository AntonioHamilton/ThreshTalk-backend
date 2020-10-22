const request = require('supertest');
const app = require('../../../Config/app')();
const databaseHelper = require('../../../Helpers/databaseHelper');
const uuid = require('node-uuid');

const Post = require('../Model');

describe('integration tests of posts', () => {
  beforeAll(async () => {
    await databaseHelper.openConnection();
    await request(app).post('/posts').send({
      message: 'any_message',
    });
  });

  describe('addComment tests', () => {
    test('Should add a new comment', async () => {
      const allPosts = await request(app).get('/posts');
      const id = allPosts.body[0].id;
      const res = await request(app).post(`/posts/${id}/comments`).send({
        comment: 'any_comment',
      });
      expect(res.status).toBe(201);
    });

    test('Should not add a new comment without a comment', async () => {
      const allPosts = await request(app).get('/posts');
      const id = allPosts.body[0].id;
      const res = await request(app).post(`/posts/${id}/comments`).send({
        comment: '',
      });
      expect(res.status).toBe(500);
    });

    test('Should not add a new comment in a nonexistent post', async () => {
      const newId = uuid.v1();
      const res = await request(app).post(`/posts/${newId}/comments`).send({
        comment: 'teste',
      });
      expect(res.status).toBe(404);
    });

    test('Should not get post without a id non-typed as uuid', async () => {
      const newId = 1;
      const res = await request(app).post(`/posts/${newId}/comments`).send({
        comment: 'teste',
      });
      expect(res.status).toBe(500);
    });
  });

  describe('readComments tests', () => {
    test('Should get all comments of a post', async () => {
      const allPosts = await request(app).get('/posts');
      const id = allPosts.body[0].id;
      const res = await request(app).get(`/posts/${id}/comments`);
      expect(res.status).toBe(200);
    });

    test('Should not create a comment in a nonexistent post', async () => {
      const newId = uuid.v1();
      const res = await request(app).get(`/posts/${newId}/comments`);
      expect(res.status).toBe(404);
    });

    test('Should not get post without a id non-typed as uuid', async () => {
      const newId = 1;
      const res = await request(app).get(`/posts/${newId}/comments`);
      expect(res.status).toBe(500);
    });
  });

  afterAll(async () => {
    await Post.deleteMany({});
    await databaseHelper.closeConnection();
  });
});
