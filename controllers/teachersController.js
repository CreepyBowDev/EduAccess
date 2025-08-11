import { teachersModel } from '../models/teachersModel.js';

export class teachersController {
  static create (req, res) {
    const { name, email, subject, title, password } = req.body;
    const data = teachersModel.create({ name, email, subject, title, password });

    return data;
  }
}
