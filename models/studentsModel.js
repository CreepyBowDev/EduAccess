import { DbStudent } from '../user-repository.js';

export class studentsModel {
  static create ({ name, email, average, password, role }) {
    const data = DbStudent.create({ name, email, average, password, role });

    return data;
  }
}
