import express, { Request, Response } from 'express';
import cors from 'cors';
import router from './app/routes';
import globalErrorHandler from './app/middlewares/handleGlobalErrorhandler';
import notFoundHandler from './app/middlewares/notFoundHandler';
const app = express();

// parser
app.use(express.json());
app.use(cors());

app.use('/api/', router);

app.get('/', (req: Request, res: Response) => {
  res.send('Assignment-3___ server is running');
});

//global error
app.use(globalErrorHandler);

//Not Found
app.use(notFoundHandler);

export default app;
