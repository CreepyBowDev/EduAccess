import { randomUUID } from 'node:crypto';
import DbLocal from 'db-local';
import { AppError } from '../middlewares/AppError.js';

const { Schema } = new DbLocal({ path: './db' });

const Teacher = Schema('Teacher', {
  _id: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  subject: { type: String, required: true },
  title: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, required: true }
});

export class DbTeacher {
  // Funcion para crear un nuevo registro de un docente en la base de datos
  static async create ({ name, email, subject, title, password }) {
    // Se verifica que el email no se repita en un registro ya existente
    const exist = await Teacher.findOne({ email });

    if (exist) {
      throw AppError.Conflict('Este email ya existe', {
        code: 'CONFLICT',
        details: 'Ya existe un usuario con este email'
      });
    }
    // Se crea el nuevo registro y se inserta
    // Se retorna un objeto con las propiedades creadas
    return await Teacher.create({
      _id: randomUUID(),
      name,
      email,
      subject,
      title,
      password,
      role: 'teacher'
    }).save();
  }

  // Funcion para actualizar el registro de un docente en la base de datos

  static async update (id, patch) {
    // Se verifica que el usuario exista en labase de datos
    const user = await Teacher.findOne({ _id: id });
    if (!user) {
      throw AppError.NotFound('El usuario no existe', {
        code: 'NOT_FOUND',
        details: `El usuario con el ID: ${id}, no existe`
      });
    }
    // Se actualiza el registro del docente seleccionado por el id
    // Retorna el objeto con las propiedades actualizada
    return await user.update(patch).save();
  }

  // Funcion para remover/eliminar el registro de un docente en la base de datos
  static async remove ({ id }) {
    // Se verifica que el usuario exista en labase de datos
    const user = await Teacher.findOne({ _id: id });
    if (!user) {
      throw AppError.NotFound('El usuario no existe', {
        code: 'NOT_FOUND',
        details: `El usuario con el ID: ${id}, no existe`
      });
    }
    // Remueve el registro del docente indicado por el id
    // Retorna un array con todos los objetos removidos dentro de la base de datos local
    await user.remove(user => user._id === id);
  }
}
