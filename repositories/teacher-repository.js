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
  static create ({ name, email, subject, title, password }) {
    Teacher.create({
      _id: randomUUID(),
      name,
      email,
      subject,
      title,
      password,
      role: 'teacher'
    }).save();
  }
}
