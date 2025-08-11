import { randomUUID } from 'node:crypto';
import DbLocal from 'db-local';

const { Schema } = new DbLocal({ path: './db' });

const Student = Schema('Student', {
  _id: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  average: { type: Number, required: true },
  password: { type: String, required: true },
  role: { type: String, required: true }
});

export class DbStudent {
  // Funcion para crear un nuevo registro en la base de datos
  static create ({ name, email, average, password }) {
    // Se crea el nuevo registro y se inserta
    Student.create({
      _id: randomUUID(),
      name,
      email,
      average,
      password,
      role: 'student'
    }).save();
  }

  static update (id, patch) {
    // Se pasa la referencia del objeto a "user"
    Student.findOne(id).update(patch).save();
  }

  static remove ({ id }) {
    // Remueve el registro del estudiante indicado desde el id
    Student.remove(user => user._id === id);
  }
}
