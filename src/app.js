import express, { urlencoded, json } from 'express';
import morgan from 'morgan';
import path from 'path';
import cors from 'cors';

import pictureRoutes from './routes/picture';
import wkGroupRoutes from './routes/wkgroup';
import wkstationRoutes from './routes/wkstation';
import shiftRoutes from './routes/shift';

const app = express();

// settings
app.set('port', process.env.PORT || 4000);

// Middlewares
app.use(morgan('dev'));
app.use(cors());
app.use(urlencoded({ extended: false }));
app.use(json());

// Routes
app.use('/api', pictureRoutes);
app.use('/api', wkGroupRoutes);
app.use('/api', wkstationRoutes);
app.use('/api', shiftRoutes);

// Store public files
app.use('/uploads', express.static(path.resolve('uploads')));

export default app;
