import createDebug from 'debug';
import { UserRepo } from '../repository/user.mongo.repo.js';
import { NextFunction, Response, Request } from 'express';
import { HTTPError } from '../error/error.js';
import { RequestPlus, TokenPayload } from '../interfaces/interfaces.js';
import { Auth } from '../services/auth.js';

const debug = createDebug('W7CH5: controller');

export class UserController {
  constructor(public repo: UserRepo) {
    debug('Instantiate CharsController');
    this.repo = repo;
  }

  async register(req: Request, resp: Response, next: NextFunction) {
    try {
      debug('register:post method');

      if (!req.body.email || !req.body.password || !req.body.name)
        throw new HTTPError(
          401,
          'Unauthorized',
          'Invalid Name, Email or password'
        );

      req.body.password = await Auth.hash(req.body.password);

      req.body.friends = [];
      req.body.enemies = [];

      const data = await this.repo.create(req.body);

      resp.status(201);
      resp.json({
        results: [data],
      });
    } catch (error) {
      next(error);
    }
  }

  async logIn(req: Request, resp: Response, next: NextFunction) {
    try {
      debug('login:post method');

      if (!req.body.email || !req.body.password)
        throw new HTTPError(
          401,
          'Unauthorized',
          'Invalid User Name o password'
        );

      const data = await this.repo.search({
        key: 'email',
        value: req.body.email,
      });

      if (!data.length)
        throw new HTTPError(401, 'Unauthorized', 'User Name not found');

      if (!(await Auth.compare(req.body.password, data[0].password)))
        throw new HTTPError(401, 'Unauthorized', 'Password not match');

      const payload: TokenPayload = {
        id: data[0].id,
        email: data[0].email,
        role: 'Admin',
      };

      const token = Auth.createJWT(payload);

      resp.status(202);
      resp.json({
        results: {
          token,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  async editProfile(req: RequestPlus, res: Response, next: NextFunction) {
    try {
      debug('Updating profile...');
      if (!req.info?.id)
        throw new HTTPError(404, 'User not found', 'User not found');
      const member = await this.repo.queryId(req.info.id);
      req.body.id = member.id;
      const updatedMember = await this.repo.update(req.body);
      debug('Profile updated!');
      res.json({ results: [updatedMember] });
    } catch (error) {
      next(error);
    }
  }

  async addRelation(req: RequestPlus, resp: Response, next: NextFunction) {
    try {
      debug('add relation');
      const userId = req.info?.id;
      if (!userId) throw new HTTPError(404, 'Not found', 'Not found user id');
      const actualUser = await this.repo.queryId(userId);
      const data = await this.repo.queryId(req.params.id);
      if (!data) throw new HTTPError(404, 'Not found', 'Not found user id');

      // Determine whether to add as friend or enemy
      const { relation } = req.body;
      if (relation === 'friend') {
        actualUser.friends.push(data);
      } else if (relation === 'enemy') {
        actualUser.enemies.push(data);
      } else {
        throw new HTTPError(400, 'Bad request', 'Invalid relation specified');
      }

      this.repo.update(actualUser);
      resp.json({
        results: [actualUser],
      });
    } catch (error) {
      next(error);
    }
  }

  async removeRelation(req: RequestPlus, resp: Response, next: NextFunction) {
    try {
      debug('remove relation');
      const userId = req.info?.id;
      if (!userId) throw new HTTPError(404, 'Not found', 'Not found user id');
      const actualUser = await this.repo.queryId(userId);
      const data = await this.repo.queryId(req.params.id);
      if (!data) throw new HTTPError(404, 'Not found', 'Not found user id');

      // Determine whether to remove from friends or enemies
      const { relation } = req.body;
      if (relation === 'friend') {
        actualUser.friends = actualUser.friends.filter(
          (friend) => friend.id !== data.id
        );
      } else if (relation === 'enemy') {
        actualUser.enemies = actualUser.enemies.filter(
          (enemy) => enemy.id !== data.id
        );
      } else {
        throw new HTTPError(400, 'Bad request', 'Invalid relation specified');
      }

      this.repo.update(actualUser);
      resp.json({
        results: [actualUser],
      });
    } catch (error) {
      next(error);
    }
  }

  async getAll(_req: Request, resp: Response, next: NextFunction) {
    debug('controller: getAll');
    try {
      const data = await this.repo.query();
      resp.json({
        result: data,
      });
    } catch (error) {
      next(error);
    }
  }
}
