const jwt = require("jsonwebtoken");
const ResponseHelper = require("../helper/helper");

exports.protect = (req, res, next) => {
  try {
    const token =
      req.headers.authorization && req.headers.authorization.split(" ")[1];

    if (!token) {
      return ResponseHelper.response(
        res,
        false,
        null,
        "Unauthorized: No token provided",
        401
      );
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = { id: decoded.id, ...decoded };

    next();
  } catch (error) {
    return ResponseHelper.response(
      res,
      false,
      null,
      "Unauthorized: Invalid or expired token",
      401
    );
  }
};
