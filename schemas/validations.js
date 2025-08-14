import { z } from 'zod';

const emptyToUndef = (schema) =>
  z.preprocess(v => (v === '' || v === null ? undefined : v), schema.optional());

const StudentRegister = z.object({
  name: z.string('El nombre debe ser de tipo texto').nonempty('El nombre no puede estar vacío').min(3, 'Nombre muy corto').optional(),
  email: z.string().email('Email inválido').nonempty('El email no puede estar vacio').optional(),
  average: z.number('El promedio debe ser un numero').max(100).min(0).optional(),
  password: z.string().min(8, 'La contraseña debe tener al menos 8 caracteres').nonempty('La contraseña no puede estar vacia').optional()
});

const StudentUpdate = z.object({
  name: emptyToUndef(z.string('El nombre debe ser de tipo texto').min(3, 'Nombre muy corto')),
  email: emptyToUndef(z.string().email('Email inválido')),
  average: z.preprocess(
    v => (v === '' || v === null ? undefined : v),
    z.coerce.number('El promedio debe ser un numero').min(0, 'No puede ser negativo').optional()
  ),
  password: emptyToUndef(z.string().min(8, 'La contraseña debe tener al menos 8 caracteres'))
}).strict();

export class studentsValidate {
  static validateRegister ({ name, email, average, password }) {
    return StudentRegister.safeParse({
      name,
      email,
      average,
      password
    });
  }

  static validateUpdate ({ name, email, average, password }) {
    return StudentUpdate.safeParse({
      name,
      email,
      average,
      password
    });
  }
}
