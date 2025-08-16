import { teachersModel } from '../models/teachersModel.js';
import { teachersValidations } from '../schemas/teachersValidations.js';
import { AppError } from '../middlewares/AppError.js';

export class teachersController {
  static async create (req, res, next) {
    try {
      const { name, email, subject, title, password } = req.body;
      const information = teachersValidations.validate({ name, email, subject, title, password });
      if (!information.success) {
        throw AppError.BadRequest('Validacion fallida', {
          code: information.code,
          details: information.error?.format?.() ?? undefined
        });
      }

      const data = await teachersModel.create({ name, email, subject, title, password });

      return res.status(200).send(data);
    } catch (error) {
      return next(error);
    }
  }

  static async update (req, res, next) {
    try {
      const { id } = req.params;
      const { name, email, subject, title, password } = req.body;
      const information = teachersValidations.validatePartial({ id, name, email, subject, title, password });

      if (!information.success) {
        throw AppError.BadRequest('Validacion fallida', {
          code: information.error.code,
          details: information.error?.format?.() ?? undefined
        });
      }

      const data = await teachersModel.update({ id, name, email, subject, title, password });

      return res.status(200).send(data);
    } catch (error) {
      return next(error);
    }
  }

  static async remove (req, res, next) {
    try {
      const { id } = req.params;

      const information = teachersValidations.validatePartial({ id });

      if (!information.success) {
        throw AppError.BadRequest('Validacion fallida', {
          code: information.error.code,
          details: information.error?.format?.() ?? undefined
        });
      }

      await teachersModel.remove({ id });

      return res.status(200).send('Se elimino el usuario exitosamente');
    } catch (error) {
      return next(error);
    }
  }
}
