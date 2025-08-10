import { DbStudent } from '../user-repository.js';
import bcrypt from 'bcrypt';

export class studentsModel {
  static async create ({ name, email, average, password, role }) {
    const hashedPassowrd = await bcrypt.hash(password, 10);
    const data = await DbStudent.create({ name, email, average, password: hashedPassowrd });

    return data;
  }

  static async update ({ id, name, email, average, password }) {
  // Construye un objeto con los campos recibidos para procesar
    const fields = { name, email, average, password };

    // Filtra únicamente los campos que tengan un valor válido (no undefined, null o cadena vacía)
    const patch = Object.fromEntries(
      Object.entries(fields).filter(([_, value]) => value !== undefined && value !== null && value !== '')
    );

    // Si la contraseña se modificó, se hashea antes de guardar
    if (patch.password) {
      patch.password = await bcrypt.hash(patch.password, 10);
    }

    // Llama al repositorio para actualizar el registro en base de datos
    const data = DbStudent.update(id, patch);

    return data;
  }
}
