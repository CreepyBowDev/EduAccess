import { Router } from 'express';
import { studentsController } from '../models/studentsController';

const router = Router();

router.post('/login', (req, res) => studentsController.create);
