import { Router } from 'express';
import { teachersController } from '../controllers/teachersController.js';

export const teachersRouter = Router();

teachersRouter.post('/register', teachersController.create);
teachersRouter.patch('/:id', teachersController.update);
teachersRouter.delete('/:id', teachersController.remove);
