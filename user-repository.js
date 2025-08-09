import crypto from 'node:crypto';
import DbLocal from 'db-local';
import bcrypt from 'bcrypt';

const { Schema } = new DbLocal({ path: './databases' });

const Student = Schema('Student', {
  _id: { type: Number, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, required: true }
});
