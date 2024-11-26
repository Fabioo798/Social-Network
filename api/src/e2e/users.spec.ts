import mongoose from 'mongoose';
import request from 'supertest';
import { TokenPayload } from '../interfaces/interfaces.js';
import { Auth } from '../services/auth.js';
import { UserModel } from './../repository/user.mongo.model.js';
import { dbConnect } from './../db/db.connect.js';
import { app } from '../app.js';

const setCollection = async () => {
 const databaseMock = [
  {
   email: 'pepe',
   password: 'pepe12',
   name: 'pepe',
   friend: [],
   enemy: [],
  },
  {
   email: 'lello',
   password: 'lello12',
   name: 'lello',
   friend: [],
   enemy: [],
  },
 ];
 await UserModel.deleteMany();
 await UserModel.insertMany(databaseMock);
 const data = await UserModel.find();
 const testIds = [data[0].id, data[1].id];
 return testIds;
};

let ids: Array<string>;

describe('Given an "app" with "/users" route', () => {
 describe('when we connect to mongoDB', () => {
  let token: string;

  beforeEach(async () => {
   await dbConnect();
   ids = await setCollection();
   const payload: TokenPayload = {
    id: ids[0],
    name: 'pepe',
    role: 'admin',
    email: 'pepe',
   };
   token = Auth.createJWT(payload);
  });

  afterEach(async () => {
   await mongoose.disconnect();
  });

  test('then the get (GET ALL ok) to urls /users should send a 200 status', async () => {
   await request(app)
    .get('/users')
    .set('Authorization', `Bearer ${token}`)
    .expect(200);
  });
  test('then the get (GET ALL NO ok) to urls /users should send a 404 status', async () => {
   await request(app)
    .get('/ser')
    .set('Authorization', `Bearer ${token}`)
    .expect(404);
  });
 });
});
