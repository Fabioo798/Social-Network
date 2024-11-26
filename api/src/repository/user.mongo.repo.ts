import createDebug from 'debug';
import { User } from '../entities/user.js';
import { HTTPError } from '../error/error.js';
import { Repo } from '../interfaces/interfaces.js';
import { UserModel } from './user.mongo.model.js';

const debug = createDebug('W7CH5: repo');

export class UserRepo implements Repo<User> {
  private static instance: UserRepo;

  private constructor() {
    debug('Instantiate UserRepo');
  }

  public static getInstance(): UserRepo {
    if (!UserRepo.instance) {
      UserRepo.instance = new UserRepo();
    }

    return UserRepo.instance;
  }

  async query(): Promise<User[]> {
    debug('query');
    const data = await UserModel.find()
      .populate('friends', {
        friends: 0,
        enemies: 0,
        id: 0,
      })
      .populate('enemies', {
        friends: 0,
        enemies: 0,
        id: 0,
      });
    return data;
  }

  async queryId(id: string): Promise<User> {
    debug('queryId');
    const data = await UserModel.findById(id)
      .populate('friends', {
        friends: 0,
        enemies: 0,
        id: 0,
      })
      .populate('enemies', {
        friends: 0,
        enemies: 0,
        id: 0,
      });
    if (!data)
      throw new HTTPError(
        404,
        'Not Found',
        'queryId not possible: id not found in database'
      );
    return data;
  }

  async search(query: { key: string; value: unknown }): Promise<User[]> {
    debug('search');
    const data = await UserModel.find({ [query.key]: query.value });

    return data;
  }

  async create(info: Partial<User>): Promise<User> {
    debug('create');
    const data = await UserModel.create(info);
    return data;
  }

  async update(info: Partial<User>): Promise<User> {
    debug('update');
    const data = await UserModel.findByIdAndUpdate(info.id, info, {
      select: '-enemies',
      new: true,
    });
    if (!data)
      throw new HTTPError(
        404,
        'Not Found',
        'update not possible: id not found in database'
      );
    return data;
  }

  async destroy(id: string): Promise<void> {
    debug('destroy');
    const data = await UserModel.findByIdAndDelete(id);
    if (!data)
      throw new HTTPError(
        404,
        'Not Found',
        'delete not possible: id not found in database'
      );
  }
}
