import { randomUUID } from 'node:crypto';
import DbLocal from 'db-local';
import bcrypt from 'bcrypt';

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
  static create ({ name, email, average, password, role }) {
    const hashedPassowrd = bcrypt.hashSync(password, 10);
    Student.create({
      _id: randomUUID(),
      name,
      email,
      average,
      password: hashedPassowrd,
      role: 'student'
    }).save();
  }
}
