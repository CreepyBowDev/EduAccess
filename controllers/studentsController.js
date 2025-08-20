import { studentsModel } from '../models/studentsModel.js';
import { studentsValidate } from '../schemas/studentsValidations.js';
import { AppError } from '../middlewares/AppError.js';

export class studentsController {
  static async create (req, res, next) {
    try {
      const { name, email, average, password } = req.body;
      const information = studentsValidate.validate({ name, email, average, password });

      if (!information.success) {
        // return res.status(400).json({ errors: information.error.format() });
        throw AppError.BadRequest('Validacion Fallida',
          {
            code: information.error.code,
            details: information.error?.format?.() ?? undefined
          });
      }

      const data = await studentsModel.create({ name, email, average, password });

      return res.status(200).send(data);
    } catch (err) {
      return next(err);
    }
  }

  static async loginUser (req, res, next) {
    try {
      const { record, password } = req.body;
      const data = await studentsModel.loginUser({ record, password });

      return res.status(200).send({
        data,
        message: 'Inicio de sesion exitoso'
      });
    } catch (error) {
      return next(error);
    }
  }

  static async getAll (req, res, next) {
    try {
      const data = await studentsModel.getAll();
      return res.status(200).send(data);
    } catch (error) {
      return next(error);
    }
  }

  static async getById (req, res, next) {
    try {
      const { id } = req.params;
      const information = studentsValidate.validatePartial({ id });
      if (!information.success) {
        throw AppError.BadRequest('Validacion fallida', {
          code: information.code,
          details: information.error?.format?.() ?? undefined
        });
      }
      const data = await studentsModel.getById({ id });
      return res.status(200).send(data);
    } catch (error) {
      return next(error);
    }
  }

  static async getByRecord (req, res, next) {
    try {
      const { id } = req.params;
      const data = await studentsModel.getByRecord({ id });
      return res.status(200).send(data);
    } catch (error) {
      return next(error);
    }
  }

  static async update (req, res, next) {
    try {
      // Obtnecion del id desde los parametros de entrada
      const { id } = req.params;
      // Validacion de datos
      const { name, email, average, password } = req.body;
      const information = studentsValidate.validatePartial({ id, name, email, average, password });
      if (!information.success) {
        throw AppError.BadRequest('Validacion fallida', {
          code: information.error.code,
          details: information.error?.format?.() ?? undefined
        });
      }

      // Llamado al metodo para actualizar el registor de un usuario
      const { data } = await studentsModel.update({ id, name, email, average, password });

      return res.status(200).send(data);
    } catch (error) {
      return next(error);
    }
  }

  static async removeId (req, res, next) {
    try {
      const { id } = req.params;

      const information = studentsValidate.validatePartial({ id });

      if (!information.success) {
        throw AppError.BadRequest('Validacion fallida', {
          code: information.error.code,
          details: information.error?.format?.() ?? undefined
        });
      }

      await studentsModel.removeId({ id });

      return res.send({ information: 'Usuario eliminado con exito' });
    } catch (error) {
      return next(error);
    }
  }
}
