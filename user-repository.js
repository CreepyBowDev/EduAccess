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
  static async create ({ name, email, average, password }) {
    Student.create({
      _id: randomUUID(),
      name,
      email,
      average,
      password,
      role: 'student'
    }).save();
  }

  static async update (id, patch) {
    // Se pasa la referencia del objeto a "user"
    const user = await Student.findOne(id);

    // En base a la referencia dada, se actualizan las propiedades del objeto original y se guardan
    user.update(patch).save();
  }
}
