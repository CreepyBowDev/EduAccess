import { z } from 'zod';

const Student = z.object({
  id: z.uuid().optional(),
  name: z.string().min(3, 'Nombre muy corto'),
  email: z.string().email('Email inválido'),
  average: z.number().max(100).min(0),
  password: z.string().min(8, 'La contraseña debe tener al menos 8 caracteres')
});

export class studentsValidate {
  static validate ({ name, email, average, password }) {
    return Student.safeParse({
      name,
      email,
      average,
      password
    });
  }
}
