const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const models = require("../models");
const cryptoJS = require("crypto-js");
const dotenv = require("dotenv");
const sequelize = require("sequelize");
dotenv.config();

exports.signup = (req, res, next) => {
  const emailCrypted = cryptoJS
    .SHA256(req.body.email, process.env.EMAIL_SECRET)
    .toString();

  models.User.findOne({
    where: { username: req.body.username },
  }).then((usernameFound) => {
    if (usernameFound) {
      return res
        .status(409)
        .json("Username already exists, please try another one"); // verification de l'username
    } else {
      models.User.findOne({
        where: { email: emailCrypted },
      })
        .then((emailFound) => {
          if (emailFound) {
            return res
              .status(409)
              .json("Email already exists, please try another one"); // verification du mail
          } else {
            bcrypt.hash(req.body.password, 10).then((hash) => {
              // création de l'utilisateur et envoi du token
              models.User.create({
                email: emailCrypted,
                username: req.body.username,
                password: hash,
                bio: req.body.bio,
                isAdmin: 0,
              }).then((user) => {
                res.status(201).json({
                  userId: user.id,
                  username: user.username,
                  token: jwt.sign(
                    { userId: user.id, isAdmin: user.isAdmin },
                    process.env.JWT_SECRET,
                    {
                      expiresIn: process.env.JWT_EXPIRATION,
                    }
                  ),
                });
              });
            });
          }
        })
        .catch(() => res.status(500).json());
    }
  });
};


exports.login = (req, res, next) => {
  const emailCrypted = cryptoJS
    .SHA256(req.body.email, process.env.EMAIL_SECRET)
    .toString();

  models.User.findOne({
    where: { email: emailCrypted },
  }).then((user) => {
    console.log("contenu de user 1 ////////// :" + JSON.stringify(user));

    if (user) {
      bcrypt
        .compare(req.body.password, user.password)

        .then((valid) => {
          console.log("contenu valide ////////", valid);
          if (!valid) {
            res.status(401).json("Incorrect password");
          } else {
            res.status(200).json({
              userId: user.id,
              token: jwt.sign(
                { userId: user.id, isAdmin: user.isAdmin },
                process.env.JWT_SECRET,
                {
                  expiresIn: process.env.JWT_EXPIRATION,
                }
              ),
            });
            // Méthode avec cookies :
            //   const token = jwt.sign({ userId: user.id, isAdmin: user.isAdmin }, "JWT_SIGN_SECRET", { expiresIn: "1h"});
            //   return res.cookie("access_token", token, {
            //       httpOnly: true,
            //       maxAge: 900000,
            //       // secure: process.env.NODE_ENV === "production",
            //     }).status(200).json({ Response : "User n°" +  user.id + " Logged in successfully" });
          }
        })
        .catch(() => res.status(500).json());
    } else {
      res.status(401).json("User not found");
    }
  });
};


exports.profile = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
  const userId = decodedToken.userId;

  models.User.findOne({
    attributes: [
      "id",
      "username",
      "bio",
      [
        sequelize.fn(
          "date_format",
          sequelize.col("createdAt"),
          "%d %M %Y - %H:%i:%s "
        ),
        "createdAt",
      ],
    ],
    where: { id: userId }, // affichage des informations du profil à partir du token décodé
  })
    .then((user) => {
      if (!user) {
        res.status(404).json({ error: "User not found" });
      } else {
        res.status(201).json(user);
      }
    })
    .catch(() => res.status(500).json());
};


exports.profiles = (req, res, next) => {
  models.User.findAll({
    attributes: [
      "username",
      "bio",
      "image",
      [
        // selection des informations à afficher
        sequelize.fn(
          "date_format",
          sequelize.col("createdAt"),
          "%d %M %Y - %H:%i:%s "
        ),
        "createdAt",
      ],
      "id",
    ],
  })
    .then((user) => {
      if (user != null) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ error: "Users not found" });
      }
    })
    .catch(() => res.status(500).json());
};


exports.deleteProfile = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
  const userId = decodedToken.userId;

  models.User.findOne({
    where: { id: userId },
  })
    .then((user) => {
      if (user || user.isAdmin == true) {
        // L'admin peut supprimer un profil
        models.User.destroy({
          where: { id: user.id },
        })
          .then(() => res.status(200).json({ message: "User deleted" }))
          .catch((err) => res.status(500).json(err));
      } else {
        res.status(405).json({ error: "Not allowed to delete" });
      }
    })
    .catch((err) => res.status(500).json(err));
};


exports.modify = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
  const userId = decodedToken.userId;

  const newPassword = req.body.password;
  const newUsername = req.body.username;
  const newBio = req.body.bio;

  models.User.findOne({
    where: { id: userId },
  })
    .then((user) => {
      if (newPassword !== "") {
        // si le champ est autre que nul alors, la verification des champs sera également faite avec les middlewares
        bcrypt
          .hash(newPassword, 10)
          .then((hash) => {
            models.User.update({ password: hash }, { where: { id: user.id } });
          })
          .then(() => {
            return res.status(201).json("Changes updated");
          });
      }

      if (newUsername !== "") {
        models.User.update(
          { username: newUsername },
          { where: { id: user.id } }
        ).then(() => {
          return res.status(201).json("Changes updated");
        });
      }

      if (newBio !== "") {
        models.User.update({ bio: newBio }, { where: { id: user.id } }).then(
          () => {
            return res.status(201).json("Changes updated");
          }
        );
      }
    })
    .catch(() => res.status(500).json({ error }));
};

// exports.logout = (req, res, next) => {
//   return res
//   .clearCookie("access_token")
//   .status(200)
//   .json({ message: "Successfully logged out" }).catch(() => res.status(500).json());
// }
