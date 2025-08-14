export class AppError extends Error {
  constructor (status, message, options = {}) {
    super(message);
    this.status = status;
    this.code = options.code;
    this.details = options.details;
  }

  static BadRequest (msg, opts) { return new AppError(400, msg, opts); }
  static Unauthorized (msg, opts) { return new AppError(401, msg, opts); }
  static NotFound (msg, opts) { return new AppError(404, msg, opts); }
  static Conflict (msg, opts) { return new AppError(409, msg, opts); }
  static Internal (msg = 'Error interno', opts) { return new AppError(500, msg, opts); }
}
