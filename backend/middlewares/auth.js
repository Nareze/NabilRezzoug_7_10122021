const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

module.exports = (req, res, next) => {

  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    if (decodedToken) {
      next();
    }
  } catch {
    res.status(403).json("Cannot verify token");
  }



    // const token = req.cookies.access_token;
    // if (!token) {
    //   return res.sendStatus(403)({ error: "Not allowed: requires token" });
    // }
    // try {
    //   const decodedToken = jwt.verify(token, "JWT_SIGN_SECRET");
    //   if (decodedToken) {
    //   next();
    // }
    // } catch {
    //   return res.sendStatus(403)({ error: "Not allowed : invalid token" });
    // }


};
