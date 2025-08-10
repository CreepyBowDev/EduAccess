import { studentsModel } from '../models/studentsModel.js';
import { studentsValidate } from '../schemas/validations.js';

export class studentsController {
  static create (req, res) {
    const { name, email, average, password, role } = req.body;
    const information = studentsValidate.validate({ name, email, average, password, role });

    if (!information.success) {
      return res.status(400).json({ errors: information.error.format() });
    }

    const data = studentsModel.create({ name, email, average, password, role });

    res.send({ data });
  }
}
