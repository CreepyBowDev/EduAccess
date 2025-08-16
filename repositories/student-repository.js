import { randomUUID } from 'node:crypto';
import DbLocal from 'db-local';
import { AppError } from '../middlewares/AppError.js';

const { Schema } = new DbLocal({ path: './db' });

// Esquema para los registros de cada entidad
const Student = Schema('Student', {
  _id: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  average: { type: Number, required: true },
  password: { type: String, required: true },
  role: { type: String, required: true }
});

export class DbStudent {
  // Funcion para crear un nuevo registro de un estudiante en la base de datos
  static async create ({ name, email, average, password }) {
    // Verificación para evitar que el email ya exista en otro usuario
    const exist = await Student.findOne({ email });

    if (exist) {
      throw AppError.Conflict('Ya existe un usuario con este email', {
        code: 'CONFLICT',
        details: 'Este email ya existe'
      });
    }

    // Se crea el nuevo registro y se inserta
    // Se retorna un objeto con las propiedades creadas y sus valores

    return await Student
      .create({
        _id: randomUUID(),
        name,
        email,
        average,
        password,
        role: 'student'
      }).save();
  }

  // Funcion para actualizar el registro de un estudiante en la base de datos
  static async update (id, patch) {
    // Se actualiza el registro del estudiante seleccionado por el id
    // Retorna el objeto con las propiedades actualizadas
    const user = await Student.findOne({ _id: id });
    let exist;

    // Verificación para evitar que el email ya exista en otro usuario
    if (patch.email) {
      exist = await Student.findOne({ email: patch.email });
    }

    if (exist) {
      throw AppError.Conflict('Ya existe un usuario con este email', {
        code: 'CONFLICT',
        details: 'Este email ya existe'
      });
    }

    // Se lanza una excepcion si no se encuentra un egistro con el id dado
    if (!user) {
      throw AppError.NotFound('Registro no encontrado', {
        code: 'NOT_FOUND',
        details: undefined
      });
    }

    return await user.update(patch).save();
  }

  // Funcion para reomover/eliminar el registro de un estudiante en la base de datos
  static async remove ({ id }) {
    const user = Student.findOne({ _id: id });
    if (!user) {
      throw AppError.NotFound('Registro no encontrado', {
        code: 'NOT_FOUND',
        details: undefined
      });
    }
    // Remueve el registro del estudiante indicado por el id
    // Retorna un array con todos los objetos removidos dentro de la base de datos local
    return await user
      .remove(user => user._id === id);
  }
}
