import { Router } from 'express';
import { studentsController } from '../controllers/studentsController.js';

export const studentsRouter = Router();

studentsRouter.post('/register', studentsController.create);
studentsRouter.patch('/:id', studentsController.update);
studentsRouter.delete('/:id', studentsController.remove);
