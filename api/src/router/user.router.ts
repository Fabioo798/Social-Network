import { Router } from 'express';
import { UserController } from '../controller/user.controller.js';
import { Interceptors } from '../interceptors/interceptors.js';
import { UserRepo } from '../repository/user.mongo.repo.js';

// eslint-disable-next-line new-cap
export const userRouter = Router();
const repo = UserRepo.getInstance();
const interceptor = new Interceptors();
const controller = new UserController(repo);

userRouter.get('/', interceptor.logged, controller.getAll.bind(controller));
userRouter.post('/login', controller.logIn.bind(controller));
userRouter.post('/register', controller.register.bind(controller));
userRouter.patch(
  '/add_relation/:id',
  interceptor.logged,
  controller.addRelation.bind(controller)
);
userRouter.delete(
  '/remove_relation/:id',
  interceptor.logged,
  controller.removeRelation.bind(controller)
);
userRouter.patch(
  '/edit_profile',
  interceptor.logged,
  interceptor.authorized,
  controller.editProfile.bind(controller)
);
