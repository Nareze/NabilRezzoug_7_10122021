exports.checkSignUpInput = (req, res, next) => {
    if (
        req.body.email == null ||
        req.body.username == null ||
        req.body.password == null
      ) {
        return res.status(400).json({ error: "missing parameters" });
      }
      if (req.body.username.length >= 13 || req.body.username.length <= 4) {
        return res
          .status(400)
          .json({ error: "wrong username (must have 5-12 characters)" });
      } else {
          next()
      }
}

exports.checkLoginInput = (req, res, next) => {
    if (req.body.email == null || req.body.password == null) {
        return res.status(400).json({ error: "missing parameters" });
      } else {
        next()
      }
}