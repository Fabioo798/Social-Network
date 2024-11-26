import createDebug from 'debug';
import cors from 'cors';
import express, { NextFunction, Request, Response } from 'express';
import morgan from 'morgan';
import { CustomError } from './error/error.js';
import { userRouter } from './router/user.router.js';

const debug = createDebug('Social network backend');

export const app = express();

app.disable('x-powered-by');

const corsOptions = {
 origin: '*',
};

app.use(morgan('dev'));
app.use(express.json());
app.use(cors(corsOptions));

app.use('/users', userRouter);
app.use('/users/:id', userRouter);

app.use(
 // eslint-disable-next-line @typescript-eslint/no-unused-vars
 (error: CustomError, _req: Request, resp: Response, _next: NextFunction) => {
  debug('error middleware');
  const status = error.statusCode || 500;
  const statusMessage = error.statusMessage || 'Internal server error';
  resp.json([
   {
    error: [
     {
      status,
      statusMessage,
     },
    ],
   },
  ]);
 }
);

app.get('/', (_req, resp, next) => {
 resp.send(`<h1>SOCIAL NETWORK BACKEND</h1>
 <p>Created by Fabio Di Noia</p>`);
 next();
});

app.use('*', (_req, resp, next) => {
 resp
  .status(404)
  .send(
   `<h1>Sorry, the path is not valid. Did you mean "http://localhost:5000/users/"?<h1>`
  );
 next();
});
