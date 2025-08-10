import { studentsModel } from '../models/studentsModel.js';
import { studentsValidate } from '../schemas/validations.js';

export class studentsController {
  static create (req, res) {
    const { name, email, average, password } = req.body;
    const information = studentsValidate.validate({ name, email, average, password });

    if (!information.success) {
      return res.status(400).json({ errors: information.error.format() });
    }

    const data = studentsModel.create({ name, email, average, password });

    res.send({ data });
  }

  static update (req, res) {
    const { id } = req.params;
    const { name, email, average, password } = req.body;
    const information = studentsValidate.validate({ id, name, email, average, password });

    if (!information.success) {
      return res.status(400).json({ errors: information.error.format() });
    }
    const data = studentsModel.update({ id, name, email, average, password });

    res.send({ data });
  }
}
