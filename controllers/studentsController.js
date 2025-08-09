import { studentsModel } from '../models/studentsModel.js';

export class studentsController {
  static create (req, res) {
    const { name, email, average, password, role } = req.body;

    const data = studentsModel.create({ name, email, average, password, role });

    res.send({ data });
  }
}
