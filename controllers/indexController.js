export class indexController {
  static renderIndexPage (req, res, next) {
    try {
      return res.render('index');
    } catch (error) {
      return next(error);
    }
  }
}
