import express from 'express';
import { config } from './config.js';
import { studentsRouter } from './routes/studentsRouter.js';
import { teachersRouter } from './routes/teachersRouter.js';

const app = express();
const port = config.PORT;

app.use(express.json());

app.use('/students', studentsRouter);

app.use('/teachers', teachersRouter);

app.use((req, res, next) => {
  const err = new Error('La página no existe');
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  const status = err.status || err.statusCode || 500;
  res.status(status).json({
    error: err.message
    // opcional en dev:
    // stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
});

app.listen(port, (req, res) => {
  console.log('Server listening on port', port);
});
