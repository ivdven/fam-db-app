import dotenv from 'dotenv';
dotenv.config();

import app from './app'
import connectMongoDB from './config/db';

const PORT = process.env.PORT;

connectMongoDB();

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});