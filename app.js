import express from 'express';
import { config } from './config.js';
import { studentsRouter } from './routes/studentsRouter.js';
import { teachersRouter } from './routes/teachersRouter.js';
import { AppError } from './middlewares/AppError.js';
import { fileURLToPath } from 'url';
import path from 'node:path';

const app = express();
const port = config.PORT;

// Necesario para obtener __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.json());

app.use('/login', (req, res) => {
  res.render('login');
});

app.use('/students', studentsRouter);

app.use('/teachers', teachersRouter);

// Middleware para manejar rutas inexistentes
app.use((req, res, next) => {
  next(AppError.NotFound('Recurso no encontrado', {
    code: 'NOT_FOUND',
    details: {
      path: req.originalUrl,
      method: req.method,
      _errors: ['La ruta solicitada no existe en el servidor']
    }
  }));
});

// Middleware para manejar errores y excepciones
app.use((err, req, res, next) => {
  const status = err.status || err.statusCode || 500;
  res.status(status).json({
    error: err.message,
    details: err.details
    // opcional en dev:
    // stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
});

app.listen(port, (req, res) => {
  console.log('Server listening on port', port);
});
