import { NextFunction, Request, Response } from 'express';
import { User } from '../entities/user.js';
import { Repo, RequestPlus, TokenPayload } from '../interfaces/interfaces.js';
import { Auth } from '../services/auth.js';
import { UserController } from './user.controller.js';

jest.mock('../services/auth.js');

jest.mock('../config.js', () => ({
  _dirname: 'test',
  config: {
    secret: 'test',
  },
}));

describe('Given the UsersController', () => {
  const mockRepo = {
    query: jest.fn(),
    queryId: jest.fn(),
    create: jest.fn(),
    search: jest.fn(),
    update: jest.fn(),
  } as unknown as Repo<User>;

  const controller = new UserController(mockRepo);

  const resp = {
    json: jest.fn(),
    status: jest.fn(),
  } as unknown as Response;

  const next = jest.fn() as unknown as NextFunction;

  describe('When getAll method is called', () => {
    const req = {} as unknown as Request;
    test('Then if the user information is completed, resp.json should been called ', async () => {
      await controller.getAll(req, resp, next);

      expect(mockRepo.query).toHaveBeenCalled();
      expect(resp.json).toHaveBeenCalled();
    });

    test('Then if the repo`s query() method throw an error, next function have been called', async () => {
      (mockRepo.query as jest.Mock).mockRejectedValue('Error');
      await controller.getAll(req, resp, next);
      expect(next).toHaveBeenCalled();
    });
  });

  describe('When Register method is called', () => {
    test('Then if the user information is completed, it should return the resp.satus and resp.json', async () => {
      const req = {
        body: {
          name: 'test',
          email: 'test',
          password: 'test',
        },
      } as unknown as Request;

      await controller.register(req, resp, next);
      expect(mockRepo.create).toHaveBeenCalled();
      expect(resp.status).toHaveBeenCalled();
      expect(resp.json).toHaveBeenCalled();
    });

    test('Then if user information in the body, has not user name, it should be catch the error and next function have been called', async () => {
      const req = {
        body: {
          password: 'test',
        },
      } as unknown as Request;

      await controller.register(req, resp, next);
      expect(next).toHaveBeenCalled();
    });

    test('Then if user information in the body, has not password, it should be catch the error and next function have been called', async () => {
      const req = {
        body: {
          email: 'test',
        },
      } as unknown as Request;

      await controller.register(req, resp, next);
      expect(next).toHaveBeenCalled();
    });
  });

  describe('When LogIn method is called', () => {
    test('Then if the user information is completed, it should return the resp.status and resp.json', async () => {
      const req = {
        body: {
          email: 'test',
          password: 'test',
        },
      } as unknown as Request;

      (mockRepo.search as jest.Mock).mockResolvedValue(['test']);

      Auth.compare = jest.fn().mockResolvedValue(true);

      await controller.logIn(req, resp, next);
      expect(resp.status).toHaveBeenCalled();
      expect(resp.json).toHaveBeenCalled();
    });

    test('Then if the user information has not email, it should be catch the error and next function have been called', async () => {
      const req = {
        body: {
          password: 'test',
        },
      } as unknown as Request;

      await controller.logIn(req, resp, next);
      expect(next).toHaveBeenCalled();
    });

    test('Then if the user information has not password, it should be catch the error and next function have been called', async () => {
      const req = {
        body: {
          email: 'test',
        },
      } as unknown as Request;

      await controller.logIn(req, resp, next);
      expect(next).toHaveBeenCalled();
    });

    test('Then if the user information is complete but the search method return an empty array, it should be catch the error and next function have been called', async () => {
      const req = {
        body: {
          email: 'test',
          password: 'test',
        },
      } as unknown as Request;

      (mockRepo.search as jest.Mock).mockResolvedValue([]);

      await controller.logIn(req, resp, next);
      expect(next).toHaveBeenCalled();
    });

    test('Then if the user information is complete but the compare method of Auth return false, it should be catch the error and next function have been called', async () => {
      const req = {
        body: {
          email: 'test',
          password: 'test',
        },
      } as unknown as Request;

      (mockRepo.search as jest.Mock).mockResolvedValue(['test']);

      Auth.compare = jest.fn().mockResolvedValue(false);

      await controller.logIn(req, resp, next);
      expect(next).toHaveBeenCalled();
    });
  });

  describe('When call the editProfile method', () => {
    describe('When all params are correct', () => {
      test('Then it should call resp.json', async () => {
        const req = {
          body: { name: 'test', email: 'Test', password: 'test' },
          info: { id: '1' },
        } as unknown as RequestPlus;
        (mockRepo.queryId as jest.Mock).mockResolvedValue({});
        (mockRepo.update as jest.Mock).mockResolvedValue({});
        await controller.editProfile(req, resp, next);
        expect(resp.json).toHaveBeenCalled();
      });
    });

    describe('When repo.queryId fails', () => {
      test('Then it should call next', async () => {
        const req = {
          body: { name: 'test', email: 'Test', password: 'test' },
          info: { id: '1' },
        } as unknown as RequestPlus;
        (mockRepo.queryId as jest.Mock).mockResolvedValue(undefined);

        await controller.editProfile(req, resp, next);
        expect(next).toHaveBeenCalled();
      });
    });

    describe('When there is no req.info.id', () => {
      test('Then it should call next', async () => {
        const req = {
          body: { name: 'test', email: 'Test', password: 'test' },
          info: { id: '1' },
        } as unknown as RequestPlus;
        req.info = undefined as unknown as TokenPayload;
        await controller.editProfile(req, resp, next);
        expect(next).toHaveBeenCalled();
      });
    });
  });

  describe('When addRelation method is called', () => {
    test('Then if the user selected friend and information is completed, it should return the resp.json', async () => {
      const req = {
        info: { id: '1' },
        params: { id: '1' },
        body: { relation: 'friend' },
      } as unknown as RequestPlus;

      (mockRepo.queryId as jest.Mock).mockResolvedValue({
        friends: [{ id: '1' }],
        id: '2',
      });

      await controller.addRelation(req, resp, next);
      expect(resp.json).toHaveBeenCalled();
    });

    test('Then if the user selected enemies and information is completed, it should return the resp.json', async () => {
      const req = {
        info: { id: '1' },
        params: { id: '1' },
        body: { relation: 'enemy' },
      } as unknown as RequestPlus;

      (mockRepo.queryId as jest.Mock).mockResolvedValue({
        friends: [{ id: '1' }],
        id: '2',
      });

      await controller.addRelation(req, resp, next);
      expect(resp.json).toHaveBeenCalled();
    });

    test('Then if the user selected did NOT select relation, it should return next', async () => {
      const req = {
        info: { id: '1' },
        params: { id: '1' },
        body: { relation: '' },
      } as unknown as RequestPlus;

      (mockRepo.queryId as jest.Mock).mockResolvedValue({
        friends: [{ id: '1' }],
        id: '2',
      });

      await controller.addRelation(req, resp, next);
      expect(next).toHaveBeenCalled();
    });
    test('Then if the req.info.id is undefined, it should be catch the error and next function have been called', async () => {
      const req = {
        info: { id: undefined },
        body: { relation: 'friend' },
      } as unknown as RequestPlus;
      req.info = undefined as unknown as TokenPayload;

      await controller.addRelation(req, resp, next);
      expect(next).toHaveBeenCalled();
    });

    test('Then if if the queryId of the repoMock resolved undefined, it should be catch the error and next function have been called', async () => {
      const req = {
        info: { id: '1' },
        params: { id: '1' },
      } as unknown as RequestPlus;

      (mockRepo.queryId as jest.Mock).mockResolvedValue(undefined);

      await controller.addRelation(req, resp, next);
      expect(next).toHaveBeenCalled();
    });

    test('Then if if the the new user is already as as friend, it should be catch the error and next function have been called', async () => {
      const req = {
        info: { id: '1' },
        params: { id: '1' },
      } as unknown as RequestPlus;

      (mockRepo.queryId as jest.Mock).mockResolvedValue({
        friends: [{ id: '1' }],
        id: '1',
      });

      await controller.addRelation(req, resp, next);
      expect(next).toHaveBeenCalled();
    });
  });

  describe('When removeRelation method is called', () => {
    test('Then if the user information is completed, it should return the resp.json', async () => {
      const req = {
        info: { id: '1' },
        params: { id: '1' },
        body: { relation: 'friend' },
      } as unknown as RequestPlus;

      (mockRepo.queryId as jest.Mock).mockResolvedValue({
        friends: [{ id: '1' }, { id: '2' }],
        id: '2',
      });

      await controller.removeRelation(req, resp, next);
      expect(resp.json).toHaveBeenCalled();
    });
    test('Then if the user information is completed and relation is enemy, it should return the resp.json', async () => {
      const req = {
        info: { id: '1' },
        params: { id: '1' },
        body: { relation: 'enemy' },
      } as unknown as RequestPlus;

      (mockRepo.queryId as jest.Mock).mockResolvedValue({
        enemies: [{ id: '1' }, { id: '2' }],
        id: '2',
      });

      await controller.removeRelation(req, resp, next);
      expect(resp.json).toHaveBeenCalled();
    });
    test('Then if the user does NOT select relation, it should return next', async () => {
      const req = {
        info: { id: '1' },
        params: { id: '1' },
        body: { relation: '' },
      } as unknown as RequestPlus;

      (mockRepo.queryId as jest.Mock).mockResolvedValue({
        friends: [{ id: '1' }, { id: '2' }],
        id: '2',
      });

      await controller.removeRelation(req, resp, next);
      expect(next).toHaveBeenCalled();
    });
    test('Then if the req.info.id is undefined, it should be catch the error and next function have been called', async () => {
      const req = {
        info: { id: undefined },
      } as unknown as RequestPlus;
      req.info = undefined as unknown as TokenPayload;

      await controller.removeRelation(req, resp, next);
      expect(next).toHaveBeenCalled();
    });

    test('Then if if the queryId of the repoMock resolved undefined, it should be catch the error and next function have been called', async () => {
      const req = {
        info: { id: '1' },
        params: { id: '1' },
      } as unknown as RequestPlus;

      (mockRepo.queryId as jest.Mock).mockResolvedValue(undefined);

      await controller.removeRelation(req, resp, next);
      expect(next).toHaveBeenCalled();
    });
  });
});
