import { loginModel } from '../models/loginModel.js';

export class loginController {
  static renderLoginPage (req, res, next) {
    try {
      res.render('login');
    } catch (error) {
      return next(error);
    }
  }

  static async loginUser (req, res, next) {
    try {
      const { record, password, role } = req.body;
      const data = await loginModel.loginUser({ record, password, role });

      return res.status(200).send({
        data,
        message: 'Inicio de sesion exitoso'
      });
    } catch (error) {
      return next(error);
    }
  }
}
