const mockingoose = require('mockingoose');
import request from 'supertest';
import app from '../../app';
import User from '../../models/auth/User';

describe('User API (mockingoose)', () => {
  afterEach(() => {
    mockingoose.resetAll();
  });

  it('should return an empty array on GET /api/users', async () => {
    mockingoose(User).toReturn([], 'find');

    const res = await request(app).get('/api/users');
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual([]);
  });

  it('should return 1 user on GET /api/users', async () => {
    const fakeUser = { name: 'Alice', email: 'alice@example.com' };
    mockingoose(User).toReturn([{ ...fakeUser }], 'find');
  
    const res = await request(app).get('/api/users');
  
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body[0]).toMatchObject(fakeUser);
  });
  
  it('should create a user on POST /api/users/register', async () => {
    mockingoose(User).toReturn(null, 'findOne');
    mockingoose(User).toReturn(
      { _id: '2', name: 'Bob', email: 'bob@example.com' },
      'save'
    );

    const res = await request(app)
      .post('/api/users/register')
      .send({ name: 'Bob', email: 'bob@example.com' });

    expect(res.statusCode).toBe(201);
    expect(res.body).toMatchObject({
      name: 'Bob',
      email: 'bob@example.com',
    });
  });

  it('should return 409 if user already exists', async () => {
    mockingoose(User).toReturn({ _id: '3', email: 'exists@example.com' }, 'findOne');

    const res = await request(app)
      .post('/api/users/register')
      .send({ name: 'Already Exists', email: 'exists@example.com' });

    expect(res.statusCode).toBe(409);
    expect(res.body.message).toBe('User already exists');
  });
});
