import { Router } from 'express';
import { loginController } from '../controllers/loginController.js';

export const loginRouter = Router();

loginRouter.get('/login', loginController.renderLoginPage);
loginRouter.post('/login', loginController.loginUser);
