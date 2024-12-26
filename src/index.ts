import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import { registerRoutes } from './routers/index';

// Tải biến môi trường từ tệp .env
dotenv.config();

const app = express();
const PORT = 5000;

app.use(express.json());

// Đăng ký các routes
registerRoutes(app);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
