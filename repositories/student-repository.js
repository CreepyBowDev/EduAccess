import { randomUUID } from 'node:crypto';
import DbLocal from 'db-local';
import { AppError } from '../middlewares/AppError.js';
import bcrypt from 'bcrypt';

const { Schema } = new DbLocal({ path: './db' });

// Esquema para los registros de cada entidad
const Student = Schema('Student', {
  _id: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  average: { type: Number, required: true },
  record: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, required: true }
});

export class DbStudent {
  // Funcion para crear un nuevo registro de un estudiante en la base de datos
  static async create ({ name, email, average, record, password }) {
    // Verificación para evitar que el email ya exista en otro usuario

    const existing = await Student.findOne({
      $or: [{ email }, { record }]
    });

    if (existing) {
      throw AppError.Conflict('Ya existe un usuario con ese email o registro', {
        code: 'CONFLICT',
        details: 'El email o el registro ya están en uso'
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
        record,
        password,
        role: 'student'
      }).save();
  }

  // Funcion para loguear a un usuario
  static async loginUser ({ record, password }) {
    // Busca al usuario por su número de registro
    const user = await Student.findOne({ record });

    // Si el usuario no fue encontrado lanza el siguiente error
    if (!user) {
      throw AppError.NotFound('Este registro no existe', {
        code: 'NOT_FOUND',
        details: 'No se encontro un usuario con este registro'
      });
    }

    // Compara la contraseña ingresada con la almacenada (hasheada)
    const comparePassword = await bcrypt.compare(password, user.password);

    // Si la contraseña es incorrecta lanza el siguiente error
    if (!comparePassword) {
      throw AppError.BadRequest('La contraseña es incorrecta', {
        code: 'BAD_REQUEST',
        details: `La contraseña [${password}] es incorrecta`
      });
    }

    // Retorna el usuario autenticado
    return user;
  }

  static async getAll () {
    const user = await Student.find();
    return user;
  }

  static async getById ({ id }) {
    const user = await Student.findOne({ _id: id });
    return user;
  }

  static async getByRecord ({ id }) {
    const user = await Student.findOne({ record: id });
    return user;
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
  static async removeId ({ id }) {
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
