import express from "express";
import cors from "cors";
import helmet from "helmet";
import "doenv/config";
import cookieParser from "cookie-parser";
import logger from './middleware/logger.js';
import { errors } from "celebrate";
import { errorHandler } from './middleware/errorHandler.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';

const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(logger());
app.use(cookieParser());

const PORT = process.env.PORT ?? 3000;

app.use(notFoundHandler());
app.use(errors());
app.use(errorHandler());

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
