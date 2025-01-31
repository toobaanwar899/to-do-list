class ResponseHelper {
  static response(res, success, data = null, message, statusCode = 200) {
    res.status(statusCode).json({
      success,
      message,
      data,
      statusCode,
    });
  }
}

module.exports = ResponseHelper;
