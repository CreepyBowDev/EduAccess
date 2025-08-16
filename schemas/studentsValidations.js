import { z } from 'zod';

// Funcion para "limpiar"/prepocesar campos antes de validarlos
const emptyToUndef = (schema) =>
  z.preprocess(v => (v === '' || v === null ? undefined : v), schema.optional());

// Esquema para validar campos de un usuario
const StudentRegister = z.object({
  name: z.string('El nombre debe ser de tipo texto').nonempty('El nombre no puede estar vacío').min(3, 'Nombre muy corto'),
  email: z.string().email('Email inválido').nonempty('El email no puede estar vacio'),
  average: z.number('El promedio debe ser un numero').max(100).min(0),
  password: z.string().min(8, 'La contraseña debe tener al menos 8 caracteres').nonempty('La contraseña no puede estar vacia')
});

// Esquema parcial para validar campos de un usuario
const StudentUpdate = z.object({
  id: emptyToUndef(z.uuid('Ingrese un id valido')),
  name: emptyToUndef(z.string('El nombre debe ser de tipo texto').min(3, 'Nombre muy corto')),
  email: emptyToUndef(z.string().email('Email inválido')),
  average: z.preprocess(
    v => (v === '' || v === null ? undefined : v),
    z.coerce.number('El promedio debe ser un numero').min(0, 'No puede ser negativo').optional()
  ),
  password: emptyToUndef(z.string().min(8, 'La contraseña debe tener al menos 8 caracteres'))
}).strict();

// Clase para encapsular propiedades y exportarlo
export class studentsValidate {
  static validate ({ name, email, average, password }) {
    return StudentRegister.safeParse({
      name,
      email,
      average,
      password
    });
  }

  static validatePartial ({ id, name, email, average, password }) {
    return StudentUpdate.safeParse({
      id,
      name,
      email,
      average,
      password
    });
  }
}
