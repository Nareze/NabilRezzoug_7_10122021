exports.checkSignUp = (req, res, next) => {
  if (
    req.body.email == null ||
    req.body.username == null ||
    req.body.password == null
  ) {
    return res.status(400).json("Missing parameters");
  } else {
    next();
  }
};

exports.checkUsername = (req, res, next) => {
  if (req.body.username.length >= 13 || req.body.username.length <= 2) {
    return res.status(400).json("Wrong username (must have 3-12 characters)");
  } else {
    next();
  }
};

exports.checkLoginInput = (req, res, next) => {
  if (req.body.email == null || req.body.password == null) {
    return res.status(400).json("missing parameters");
  } else {
    next();
  }
};
