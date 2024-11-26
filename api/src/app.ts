import cors from 'cors';
import express from 'express';
import morgan from 'morgan';
import { userRouter } from './router/user.router.js';


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

// App.use(
//  // eslint-disable-next-line @typescript-eslint/no-unused-vars
//  (error: CustomError, _req: Request, resp: Response, _next: NextFunction) => {
//   debug('error middleware');
//   console.log('error mddleware')
//   const status = error.statusCode || 500;
//   const statusMessage = error.statusMessage || 'Internal server error';
//   resp.json([
//    {
//     error: [
//      {
//       status,
//       statusMessage,
//      },
//     ],
//    },
//   ]);
//  }
// );
