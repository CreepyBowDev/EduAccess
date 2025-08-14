import { studentsModel } from '../models/studentsModel.js';
import { studentsValidate } from '../schemas/validations.js';
import { AppError } from '../middlewares/appError.js';

export class studentsController {
  static async create (req, res, next) {
    try {
      const { name, email, average, password } = req.body;
      const information = studentsValidate.validateRegister({ name, email, average, password });

      if (!information.success) {
        // return res.status(400).json({ errors: information.error.format() });
        throw AppError.BadRequest('Validacion Fallida',
          {
            code: information.error.code,
            details: information.error?.format?.() ?? undefined
          });
      }

      const { data } = await studentsModel.create({ name, email, average, password });

      return res.send(data);
    } catch (err) {
      return next(err);
    }
  }

  static async update (req, res, next) {
    try {
      const { id } = req.params;
      const { name, email, average, password } = req.body;
      const information = studentsValidate.validateUpdate({ id, name, email, average, password });

      if (!information.success) {
        throw AppError.BadRequest('Validacion fallida', {
          code: information.error.code,
          details: information.error?.format?.() ?? undefined
        });
      }
      const { data } = await studentsModel.update({ id, name, email, average, password });

      return res.send(data);
    } catch (error) {
      return next(error);
    }
  }

  static async remove (req, res) {
    const { id } = req.params;
    const { data } = await studentsModel.remove({ id });

    res.send(data);
  }
}
