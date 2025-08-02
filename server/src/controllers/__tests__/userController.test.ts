const mockingoose = require('mockingoose');
import { Request, Response } from 'express';
import { createUser } from '../../controllers/auth/userController';
import User from '../../models/auth/User';

describe('createUser controller (mockingoose)', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let statusMock: jest.Mock;
  let jsonMock: jest.Mock;

  beforeEach(() => {
    statusMock = jest.fn().mockReturnThis();
    jsonMock = jest.fn();

    req = {
      body: { name: 'Test User', email: 'test@example.com' }
    };
    res = {
      status: statusMock,
      json: jsonMock
    };

    mockingoose.resetAll();
  });

  it('should return 409 if user exists', async () => {
    mockingoose(User).toReturn({ _id: '123' }, 'findOne');

    await createUser(req as Request, res as Response);

    expect(statusMock).toHaveBeenCalledWith(409);
    expect(jsonMock).toHaveBeenCalledWith({ message: 'User already exists' });
  });

  it('should create a new user', async () => {
    mockingoose(User).toReturn(null, 'findOne');
    mockingoose(User).toReturn(
      { _id: '456', name: 'Test User', email: 'test@example.com' },
      'save'
    );

    await createUser(req as Request, res as Response);

    expect(statusMock).toHaveBeenCalledWith(201);
    expect(jsonMock).toHaveBeenCalledWith(expect.objectContaining({
      name: 'Test User',
      email: 'test@example.com'
    }));
  });
});
