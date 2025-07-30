import { Request, Response } from 'express';
import { createUser } from '../../controllers/auth/userController';
import User from '../../models/auth/User';

jest.mock('../../models/auth/User');

describe('createUser controller', () => {
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
  });

  it('should return 409 if user exists', async () => {
    (User.findOne as jest.Mock).mockResolvedValue({ _id: '123' });

    await createUser(req as Request, res as Response);

    expect(statusMock).toHaveBeenCalledWith(409);
    expect(jsonMock).toHaveBeenCalledWith({ message: 'User already exists' });
  });

  it('should create a new user', async () => {
  (User.findOne as jest.Mock).mockResolvedValue(null);

  const savedUser = {
    name: 'Test User',
    email: 'test@example.com',
    save: jest.fn().mockResolvedValue(true),
  };

  (User as unknown as jest.Mock).mockImplementation(() => savedUser);

  await createUser(req as Request, res as Response);

  expect(statusMock).toHaveBeenCalledWith(201);
  expect(jsonMock).toHaveBeenCalledWith(expect.objectContaining({
    name: 'Test User',
    email: 'test@example.com'
    }));
  });
});
