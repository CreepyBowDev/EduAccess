import { DbTeacher } from '../repositories/teacher-repository.js';
import bcrypt from 'bcrypt';

export class teachersModel {
  static async create ({ name, email, subject, title, password }) {
    const hashedPassword = await bcrypt.hash(password, 10);

    const data = await DbTeacher.create({ name, email, subject, title, password: hashedPassword });

    return data;
  }

  static async update ({ id, name, email, subject, title, password }) {
    // Construye un objeto con los campos recibidos para procesar
    const fields = { name, email, subject, title, password };

    // Filtra únicamente los campos que tengan un valor válido (no undefined, null o cadena vacía)
    const patch = Object.fromEntries(
      Object.entries(fields).filter(([_, value]) => value !== undefined && value !== null && value !== '')
    );

    if (patch.password) {
      patch.password = await bcrypt.hash(patch.password, 10);
    }

    const data = await DbTeacher.update(id, patch);

    return data;
  }

  static async remove ({ id }) {
    // Llama al repositorio para remover el registro de un profesor en la base de datos local
    await DbTeacher.remove({ id });
  }
}
