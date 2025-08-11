import { DbTeacher } from '../repositories/teacher-repository.js';
import bcrypt from 'bcrypt';

export class teachersModel {
  static async create ({ name, email, subject, title, password }) {
    const hashedPassword = await bcrypt.hash(password, 10);

    DbTeacher.create({ name, email, subject, title, password: hashedPassword });
  }
}
