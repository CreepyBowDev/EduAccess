import studensModel from './models/studentsModel';

export class studentsController {
  static create (req, res) {
    const { name, password, email } = req.body;

    const data = studensModel.create(student);
  }
}
