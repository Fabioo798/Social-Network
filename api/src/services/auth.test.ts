import { Auth } from './auth';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { TokenPayload } from '../interfaces/interfaces.js';

jest.mock('bcryptjs');
jest.mock('jsonwebtoken');
jest.mock('../config.js', () => ({
  _dirname: 'test',
  config: {
    secret: 'test',
  },
}));

describe('Given the Auth class', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  const payloadMock = {
    id: '1',
    email: 'test',
    role: 'test',
  } as unknown as TokenPayload;

  describe('When createJWT is called', () => {
    test('Then jwt.sign should be called', () => {
      Auth.createJWT(payloadMock);
      expect(jwt.sign).toHaveBeenCalled();
    });
  });
  describe('When verifyJWTgettingPayload is called', () => {
    test('Then jwt.verify should be called', () => {
      (jwt.verify as jest.Mock).mockReturnValue(payloadMock);
      Auth.verifyJWTgettingPayload('test');
      expect(jwt.verify).toHaveBeenCalled();
    });
    test('Then if the payload is wrong should throw error', () => {
      (jwt.verify as jest.Mock).mockReturnValue('string');
      expect(() => Auth.verifyJWTgettingPayload('test')).toThrow();
    });
  });

  describe('When the hash method is called', () => {
    test('Then, it should return the mock value of bcrypt.hash have been called', () => {
      (bcrypt.hash as jest.Mock).mockReturnValue(payloadMock);
      Auth.hash('test');
      expect(bcrypt.hash).toHaveBeenCalled();
    });
  });
  describe('When the compare method is called', () => {
    test('Then, it should return the mock value of bcrypt.hash have been called', () => {
      (bcrypt.compare as jest.Mock).mockReturnValue(payloadMock);
      Auth.compare('test', 'test1');
      expect(bcrypt.compare).toHaveBeenCalled();
    });
  });
});
