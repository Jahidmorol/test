import express, { Request, Response } from 'express';
import cors from 'cors';
import router from './app/routes';
const app = express();

// parser
app.use(express.json());
app.use(cors());

app.use('/api/', router);

app.get('/', (req: Request, res: Response) => {
  res.send('Assignment-3___ server is running');
});

export default app;
