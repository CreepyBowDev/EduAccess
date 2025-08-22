import { Router } from 'express';
import { studentsController } from '../controllers/studentsController.js';

export const studentsRouter = Router();

studentsRouter.post('/register', studentsController.create);
studentsRouter.get('/getAll', studentsController.getAll);
studentsRouter.get('/:id', studentsController.getById);
studentsRouter.get('/record/:id', studentsController.getByRecord);
studentsRouter.patch('/:id', studentsController.update);
studentsRouter.delete('/:id', studentsController.removeId);
