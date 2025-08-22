import { AppError } from '../middlewares/AppError.js';
import { DbStudent } from '../repositories/student-repository.js';
import { DbTeacher } from '../repositories/teacher-repository.js';

export class loginModel {
  static async loginUser ({ record, password, role }) {
    const strategies = {
      student: DbStudent.loginUser,
      teacher: DbTeacher.loginUser
    };

    const strategy = strategies[role];

    if (!strategy) {
      throw AppError.BadRequest('Petición fallida', {
        code: 'BAD_REQUEST',
        details: `Rol inválido: ${role}`
      });
    }
    const data = await strategy({ record, password });

    return data;
  }
}
