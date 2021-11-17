const bcrypt = require("bcrypt");
const jwtUtils = require("../utils/jwt.utils");
const jwt = require("jsonwebtoken");
const models = require("../models");
const cryptoJS = require("crypto-js");
const emailtoCrypt = "mypassword";
const emailRegex =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const passwordRegex = /^[a-zA-Z]\w{3,14}$/;
const JWT_SIGN_SECRET = "mdpsecret";








exports.signup = (req, res, next) => {
  // checking des inputs //
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
  }
  if (!emailRegex.test(req.body.email)) {
    return res.status(400).json({ error: "email is not valid" });
  }
  if (!passwordRegex.test(req.body.password)) {
    return res.status(400).json({
      error:
        "password invalid (must have 4-15 characters only letters, numbers and underscore",
    });
  }

  const emailCrypted = cryptoJS.SHA256(req.body.email, emailtoCrypt).toString();

  models.User.findOne({
    attributes: ["username"],
    where: { username: req.body.username },
  }) .then(usernameFound =>{
    if (usernameFound){
      return res.status(409).json({ error: "Username already exist" });     // verification de l'username pour ne pas s'inscrire deux fois avec le meme mail
    }
    else {
      models.User.findOne({
        attributes: ["email"],
        where: { email: emailCrypted },
      }) 
      .then(emailFound => {
        if (emailFound) {
          return res.status(409).json({ error: "Email already exist" });  // verification du mail
        }
        else {
          bcrypt.hash(req.body.password, 10)
          .then((hash) => {
            const newUser = models.User.create({
              email: emailCrypted,
              username: req.body.username,
              password: hash,
              isAdmin:0,
            })
          })
          .then(() => {
            return res.status(201).json({message:"Utilisateur créé !"})
          })
        }
      }) .catch(err => { res.status(500).json({error: "Unable to verify user"})})
    }
  })

};




exports.login = (req, res, next) => {
  if (req.body.email == null || req.body.password == null) {
    return res.status(400).json({ error: "missing parameters" });
  }

  const emailCrypted = cryptoJS.SHA256(req.body.email, emailtoCrypt).toString();

  models.User.findOne({
    where: { email: emailCrypted },
  })

    .then((user) => {
      console.log("contenu de user 1 ////////// :" + JSON.stringify(user));

      if (user) {
        console.log(
          "contenu de user 2 ////////// :" + JSON.stringify(user.password)
        );
        bcrypt
          .compare(req.body.password, user.password)

          .then((valid) => {
            if (!valid) {
              res.status(401).json({ message: "Incorrect password" });
            } else {
              res.status(200).json({
                userId: user.id,
                token: jwt.sign(
                  { userId: user.id, isAdmin: user.isAdmin },
                  JWT_SIGN_SECRET,
                  {
                    expiresIn: "1h",
                  }
                ),
              });
            }
          });
      } else {
        res.status(401).json({ message: "User not found" });
      }
    })

    .catch(function (err) {
      return res.status(500).json({ error: "unable to verify user" });
    });
};

exports.profile = (req, res, next) => {
  // let headerAuth = req.headers['authorization'];
  // let userId = jwtUtils.getUserId(headerAuth);

  // if (userId < 0)
  // return res.status(400).json({ 'error' : 'wrong token'});

  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, JWT_SIGN_SECRET);
  const userId = decodedToken.userId;

  models.User.findOne({
    attributes: ["id", "email", "username"],
    where: { id: userId },
  })
    .then(function (user) {
      if (!user) {
        res.status(404).json({ error: "user not found" });
      } else {
        res.status(201).json(user);
        console.log("contenu de user //////// : " + JSON.stringify(user));
      }
    })
    .catch(function (err) {
      res.status(500).json({ error: "cannot fetch user" });
    });
};

exports.deleteProfile = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, JWT_SIGN_SECRET);
  const userId = decodedToken.userId;

  models.User.findOne({
    where: { id: userId },
  }).then((user) => {
    if (user != null) {
      models.User.destroy({
        where: { id: user.id },
      })
        .then(() => res.status(200).json({ message: "User deleted" }))
        .catch((err) => console.log(err));
    } else {
      res.status(401).json({ error: "User doesn't exist" });
    }
  });
};
