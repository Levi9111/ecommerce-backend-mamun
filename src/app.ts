import cookieParser from 'cookie-parser';
import express, { Application } from 'express';
import cors from 'cors';
import notFound from './middlewares/notFound';
import httpStatus from 'http-status';
import globalErrorHandler from './middlewares/globalErrorHandler';
import router from './routes';

const app: Application = express();

app.use(express.json());
app.use(cookieParser());

app.use(cors({ origin: ['http://localhost:5173'], credentials: true }));

app.use('/api/v1', router);

app.get('/', (req, res) => {
  res.send('Sever for ecommerce service');
});

app.use(globalErrorHandler);
app.use(notFound);

export default app;
