import { randomUUID } from 'node:crypto';
import DbLocal from 'db-local';

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
    // Se actualiza el registro del docente seleccionado por el id
    // Retorna el objeto con las propiedades actualizada
    return await Teacher
      .findOne(id)
      .update(patch)
      .save();
  }

  // Funcion para remover/eliminar el registro de un docente en la base de datos
  static async remove ({ id }) {
    // Remueve el registro del docente indicado por el id
    // Retorna un array con todos los objetos removidos dentro de la base de datos local
    return await Teacher
      .remove(user => user._id === id);
  }
}
