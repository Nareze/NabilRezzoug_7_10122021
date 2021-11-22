const jwt = require("jsonwebtoken");
const JWT_SIGN_SECRET = "mdpsecret";

module.exports = (req, res, next) => {
  // try {
  //   const token = req.headers.authorization.split(" ")[1];
  //   const decodedToken = jwt.verify(token, JWT_SIGN_SECRET);
  //   const userId = decodedToken.userId;

  //   if (req.body.userId && req.body.userId !== userId) {
  //     throw "Invalid user ID";
  //   } else {
  //     next();
  //   }
  // } catch {
  //   res.status(403).json({
  //     error: new Error("Unauthorized request"),
  //   });
  // }

  // try {
  //   const token = req.headers.authorization.split(" ")[1];
  //   const decodedToken = jwt.verify(token, JWT_SIGN_SECRET);

  //   if (decodedToken) {
  //     next();
  //   }
  // } catch {
  //   res.status(403).json("Cannot verify token");
  // }


    const token = req.cookies.access_token;
    if (!token) {
      return res.sendStatus(403)({ error: "Not allowed: requires token" });
    }
    try {
      const decodedToken = jwt.verify(token, "JWT_SIGN_SECRET");
      if (decodedToken) {
      next();
    }
    } catch {
      return res.sendStatus(403)({ error: "Not allowed : invalid token" });
    }


};
