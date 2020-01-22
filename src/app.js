import express, { urlencoded, json } from 'express';
import morgan from 'morgan';

const app = express();

// settings
app.set('port', process.env.PORT || 4000);

// Middlewares
app.use(morgan('dev'));
app.use(urlencoded({ extended: false }));
app.use(json());

export default app;
