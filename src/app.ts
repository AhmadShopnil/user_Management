import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { UserRoutes } from './app/modules/user/user.route';
import { OrderRoutes } from './app/modules/order/order.route';
const app: Application = express();

app.use(express.json());
app.use(cors());

app.use('/api/users', UserRoutes);
app.use('/api/users/orders', OrderRoutes);

app.get('/', (req: Request, res: Response) => {
  const a: number = 10;

  res.send(a);
});

export default app;
