import dotenv from 'dotenv';
dotenv.config();

import express, { Request, Response } from 'express';
import cors from 'cors';
import connectMongoDB from './config/db';

import userRoutes from './routes/auth/userRoutes'

const app = express();
const PORT = process.env.PORT;

connectMongoDB();

app.use(cors());
app.use(express.json());

app.use('/api/users', userRoutes);


app.get('/api/hello', (req: Request, res: Response) => {
  res.json({ message: 'Hello from Express + TypeScript!' });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
