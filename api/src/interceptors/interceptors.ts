import { RequestPlus } from '../interfaces/interfaces.js';
import { NextFunction, Response } from 'express';
import { HTTPError } from '../error/error.js';
import { Auth } from '../services/auth.js';
import createDebug from 'debug';

const debug = createDebug('W7CH5: interceptors');

export class Interceptors {
  logged(req: RequestPlus, _resp: Response, next: NextFunction) {
    try {
      const authHeader = req.get('Authorization');
      if (!authHeader)
        throw new HTTPError(
          498,
          'Invalid header',
          'Incorrect value in Auth Header'
        );
      if (!authHeader.startsWith('Bearer'))
        throw new HTTPError(498, 'Invalid header', 'Not bearer in auth header');
      const token = authHeader.slice(7);
      const payload = Auth.verifyJWTgettingPayload(token);
      req.info = {
        id: payload.id,
        email: payload.email,
        role: payload.role,
      };
      debug('Logged!');
      next();
    } catch (error) {
      next(error);
    }
  }

  authorized(req: RequestPlus, res: Response, next: NextFunction) {
    try {
      if (!req.info)
        throw new HTTPError(498, 'Token not found', 'No member in the request');

      if (!req.body.id) req.body.id = req.params.id;

      if (req.info.id !== req.body.id)
        throw new HTTPError(401, 'Unauthorized', 'Not allowed action');
      debug('Authorized!');
      next();
    } catch (error) {
      next(error);
    }
  }
}
