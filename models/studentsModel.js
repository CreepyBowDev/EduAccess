import { DbStudent } from '../repositories/student-repository.js';
import bcrypt from 'bcrypt';
import { generateRecord } from '../utils/recordGenerator.js';

export class studentsModel {
  // Funcion para insertar un nuevo registro en la DB-Local
  static async create ({ name, email, average, password, role }) {
    const hashedPassowrd = await bcrypt.hash(password, 10); // Linea para hashear la contraseña del usuario
    const record = generateRecord('STU');
    const data = await DbStudent.create({ name, email, average, record, password: hashedPassowrd }); // Llama al repositorio una vez insertado el nuevo registro

    return { data };
  }

  static async loginUser ({ record, password }) {
    const data = await DbStudent.loginUser({ record, password });

    return data;
  }

  static async getAll () {
    const data = await DbStudent.getAll();
    return data;
  }

  static async getById ({ id }) {
    const data = await DbStudent.getById({ id });
    return data;
  }

  static async getByRecord ({ id }) {
    const data = DbStudent.getByRecord({ id });
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
    const data = await DbStudent.update(id, patch);

    return { data };
  }

  static async removeId ({ id }) {
    // Llama al repositorio para remover el registro de un estudiante en la base de datos local
    await DbStudent.removeId({ id });
  }
}
