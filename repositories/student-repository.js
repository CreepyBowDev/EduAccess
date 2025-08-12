import { randomUUID } from 'node:crypto';
import DbLocal from 'db-local';

const { Schema } = new DbLocal({ path: './db' });

// Se crea un esquema para los registros de cada entidad
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
    // Retorna el objeto con las propiedades actualizada
    return await Student
      .findOne(id)
      .update(patch)
      .save();
  }

  // Funcion para reomover/eliminar el registro de un estudiante en la base de datos
  static async remove ({ id }) {
    // Remueve el registro del estudiante indicado por el id
    // Retorna un array con todos los objetos removidos dentro de la base de datos local
    return await Student
      .remove(user => user._id === id);
  }
}
