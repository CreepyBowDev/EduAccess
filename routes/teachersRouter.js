import { Router } from 'express';
import { teachersController } from '../controllers/teachersController.js';

export const teachersRouter = Router();

teachersRouter.post('/register', teachersController.create);
// teachersController.post('/login', teachersController.login);
teachersRouter.patch('/:id', teachersController.update);
teachersRouter.delete('/:id', teachersController.remove);
