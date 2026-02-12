import express from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';

import { swaggerSpec } from './config/swagger';
import fileRoutes from './routes/file.routes';
import authRoutes from './routes/auth.routes';
import { errorHandler } from './middlewares/error.middleware';

const app = express();

app.use(cors());
app.use(express.json());
app.use(errorHandler);

app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/api/files', fileRoutes);
app.use('/api/auth', authRoutes);

export default app;
