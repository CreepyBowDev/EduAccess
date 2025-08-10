import { Router } from 'express';
import { studentsController } from '../controllers/studentsController.js';

export const studentsRouter = Router();

studentsRouter.post('/login', studentsController.create);
studentsRouter.patch('/:id', studentsController.update);
