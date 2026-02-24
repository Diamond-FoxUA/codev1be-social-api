import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import 'dotenv/config';
import cookieParser from 'cookie-parser';
import { logger } from './middleware/logger.js';
import { errors } from 'celebrate';
import { errorHandler } from './middleware/errorHandler.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';
import storiesRoutes from './routes/storiesRoutes.js';
import authRoutes from './routes/authRoutes.js';
import usersRoutes from './routes/usersRoutes.js';
import { connectMongoDB } from './db/connectMongoDB.js';

const app = express();

app.set('trust proxy', 1);

const allowedOrigins = [
  'http://localhost:3000',
  'https://codev1be-social-web.vercel.app',
];

app.use(express.json());
app.use(
  cors({
    origin(origin, callback) {
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error('Not allowed by CORS'));
    },
    credentials: true,
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);
app.use(helmet());
app.use(logger());
app.use(cookieParser());

const PORT = process.env.PORT ?? 3000;

app.use("/api/auth", authRoutes);
app.use("/api/stories", storiesRoutes);
app.use("/api/users", usersRoutes);

app.use(notFoundHandler);
app.use(errors());
app.use(errorHandler);

await connectMongoDB();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
