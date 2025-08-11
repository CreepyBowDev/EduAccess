import { Router } from 'express';
import { teachersController } from '../controllers/teachersController.js';

export const teachersRouter = Router();

teachersRouter.post('/register', teachersController.create);
