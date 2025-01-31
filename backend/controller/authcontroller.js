const User = require("../model/authmodel");
const ResponseHelper = require("../helper/helper");
const jwt = require("jsonwebtoken");
const { validateSignup, validateLogin } = require("../service/auth.service");
exports.signup = async (req, res) => {
  const { error } = validateSignup(req.body);
  if (error) {
    const errors = {};
    error.details.forEach((err) => {
      const field = err.path[0];
      errors[field] = `${field} ${err.message.replace(/["]/g, "")}`;
    });
    return ResponseHelper.response(res, false, null, errors, 400);
  }
  const { name, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return ResponseHelper.response(
        res,
        false,
        null,
        ["Email already in use"],
        400
      );
    }
    const newUser = new User({ name, email, password });
    await newUser.save();
    return ResponseHelper.response(
      res,
      true,
      { name, email },
      "User registered successfully",
      200
    );
  } catch (error) {
    return ResponseHelper.response(
      res,
      false,
      null,
      ["Server error", error.message],
      500
    );
  }
};

exports.login = async (req, res) => {
  const { error } = validateLogin(req.body);

  if (error) {
    const errors = {};
    error.details.forEach((err) => {
      const field = err.path[0];
      errors[field] = `${field} ${err.message.replace(/["]/g, "")}`;
    });
    return ResponseHelper.response(res, false, null, errors, 400);
  }
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return ResponseHelper.response(res, false, null, "Email Is Wrong", 400);
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return ResponseHelper.response(
        res,
        false,
        null,
        "Password is Wrong",
        400
      );
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    return ResponseHelper.response(
      res,
      false,
      { token: token, id: user._id, name: user.name, email: user.email },
      "User Login Successfully",
      200
    );
  } catch (error) {
    return ResponseHelper.response(res, false, null, error, 500);
  }
};

exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select("-password");
    if (!user) {
      return ResponseHelper.response(
        res,
        true,
        null,
        { message: "User not found" },
        404
      );
    }
    return ResponseHelper.response(
      res,
      false,
      user,
      "User Login Successfully",
      200
    );
  } catch (error) {
    return ResponseHelper.response(res, false, null, error, 500);
  }
};
