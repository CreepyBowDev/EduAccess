import { z } from 'zod';

// Funcion para "limpiar"/prepocesar campos antes de validarlos
const emptyToUndef = (schema) =>
  z.preprocess(v => (v === '' || v === null ? undefined : v), schema.optional());

// Esquema para validar campos de un usuario
const TeacherRegister = z.object({
  name: z.string('El nombre debe ser de tipo texto').nonempty('El nombre no puede estar vacío').min(3, 'Nombre muy corto'),
  email: z.string().email('Email inválido').nonempty('El email no puede estar vacio'),
  subject: z.string('La asignatura debe ser de tipo texto').nonempty('La asignatura no puede estar vacia'),
  title: z.string('El titulo debe ser de tipo texto').nonempty('El titulo no puede estar vacio'),
  password: z.string().min(8, 'La contraseña debe tener al menos 8 caracteres').nonempty('La contraseña no puede estar vacia')
});

// Esquema parcial para validar campos de un usuario
const TeacherUpdate = z.object({
  id: emptyToUndef(z.uuid('Ingrese un id valido')),
  name: emptyToUndef(z.string('El nombre debe ser de tipo texto').min(3, 'Nombre muy corto')),
  email: emptyToUndef(z.string().email('Email inválido')),
  subject: emptyToUndef(z.string('El nombre debe ser de tipo texto')),
  title: emptyToUndef(z.string('El nombre debe ser de tipo texto')),
  password: emptyToUndef(z.string().min(8, 'La contraseña debe tener al menos 8 caracteres'))
}).strict();

// Clase para encapsular propiedades y exportarlo
export class teachersValidations {
  static validate ({ name, email, subject, title, password }) {
    return TeacherRegister.safeParse({
      name,
      email,
      subject,
      title,
      password
    });
  }

  static validatePartial ({ id, name, email, subject, title, password }) {
    return TeacherUpdate.safeParse({
      id,
      name,
      email,
      subject,
      title,
      password
    });
  }
}
