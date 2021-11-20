const bcrypt = require("bcrypt");
const jwtUtils = require("../utils/jwt.utils");
const jwt = require("jsonwebtoken");
const models = require("../models");
const cryptoJS = require("crypto-js");
const emailtoCrypt = "mypassword";
const JWT_SIGN_SECRET = "mdpsecret";
const passwordSchema = require("../utils/passwordValidator");

exports.signup = (req, res, next) => {
  const emailCrypted = cryptoJS.SHA256(req.body.email, emailtoCrypt).toString();

  models.User.findOne({
    where: { username: req.body.username },
  }).then((usernameFound) => {
    if (usernameFound) {
      return res.status(409).json({ error: "Username already exist" }); // verification de l'username
    } else {
      models.User.findOne({
        where: { email: emailCrypted },
      }).then((emailFound) => {
        if (emailFound) {
          return res.status(409).json({ error: "Email already exist" }); // verification du mail
        } else {
          bcrypt
            .hash(req.body.password, 10)
            .then((hash) => {
              const newUser = models.User.create({
                email: emailCrypted,
                username: req.body.username,
                password: hash,
                bio: req.body.bio,
                isAdmin: 0,
              });
            })
            .then(() => {
              return res.status(201).json({ message: "Utilisateur créé !" });
            });
        }
      });
    }
  });
};

exports.login = (req, res, next) => {
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
  }).then((user) => {
    if (!user) {
      res.status(404).json({ error: "user not found" });
    } else {
      res.status(201).json(user);
      console.log("contenu de user //////// : " + JSON.stringify(user));
    }
  });
};

exports.profiles = (req, res, next) => {
  models.User.findAll({
    attributes: ["username", "bio", "image", "createdAt"],
  })
    .then((user) => {
      console.log(user);
      if (user != null) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ error: "Pas de users à afficher" });
      }
    })
    .catch((err) => res.status(500).json(err));
};

exports.deleteProfile = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, JWT_SIGN_SECRET);
  const userId = decodedToken.userId;

  models.User.findOne({
    where: {id: userId}
  }).then((user) => {
    console.log("contenu de user //////:", userId)
    if (user){
      models.User.destroy({
        where: { id: user.id}
      })
      .then(() => res.status(200).json({ message: "User deleted"}))
      .catch((err) => console.log(err))
    } else {
      res.status(405).json({ message: "Not allowed to delete"})
    }

  })
};

exports.modify = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, JWT_SIGN_SECRET);
  console.log("decodedToken //////////", decodedToken);
  const userId = decodedToken.userId;

  const newPassword = req.body.password;
  const newUsername = req.body.username;
  const newBio = req.body.bio;

  models.User.findOne({
    where: { id: userId },
  })
    .then((user) => {
      if (passwordSchema.validate(newPassword)) {
        bcrypt
          .hash(newPassword, 10)
          .then((hash) => {
            models.User.update({ password: hash }, { where: { id: user.id } });
          })
          .then(() => {
            return res.status(201).json({ message: "Password updated" });
          });
      } else {
        res.status(406).json("Password is not strong enough");
      }

      if (user.username !== newUsername) {
        models.User.update(
          { username: newUsername },
          { where: { id: user.id } }
        ).then(() => {
          return res.status(201).json({ message: "Username updated" });
        });
      } else {
        res.status(406).json("Username is the same");
      }

      if (user.bio !== newBio) {
        models.User.update({ bio: newBio }, { where: { id: user.id } }).then(
          () => {
            return res.status(201).json({ message: "Bio updated" });
          }
        );
      } else {
        res.status(406).json("Bio is the same");
      }
    })
    .catch((err) => res.status(500).json(err));
};
