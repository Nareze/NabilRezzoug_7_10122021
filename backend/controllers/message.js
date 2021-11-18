const models = require("../models");
const jwtUtils = require("../utils/jwt.utils");
const jwt = require("jsonwebtoken");
const JWT_SIGN_SECRET = "mdpsecret";

exports.createMessage = (req, res, next) => {
  // // identifier le créateur du message

  // let headerAuth = req.headers['authorization'];
  // let userId = jwtUtils.getUserId(headerAuth);
  // console.log= userId;

  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, JWT_SIGN_SECRET);
  const userId = decodedToken.userId;

  models.User.findOne({
    attributes: ["id", "email", "username"],
    where: { id: userId },
  })

    .then((user) => {
      if (user !== null) {
        let contenu = req.body.contenu;
        let imageUrl;

        if (req.file !== undefined) {
          imageUrl = `${req.protocol}://${req.get("host")}/images/${
            req.file.filename
          }`;
          models.Message.create({
            contenu: req.body.contenu,
            image: imageUrl,
            UserId: user.id,  // majuscules sensible à la casse
          })
            .then((message) => {
              res.status(201).json(message);
            })
            .catch((err) => {
              res.status(500).json(err);
            });
        }

        if (contenu) {
          models.Message.create({
            contenu: req.body.contenu,
            UserId: user.id,
          })
            .then((message) => {
              res.status(201).json(message);
            })
            .catch((err) => {
              res.status(500).json(err);
            });
        }

        if (contenu == null && imageUrl == null) {
          res.status(400).json({ error: "Empty message" });
        }
      } else {
        res.status(400).json(error);
      }
    })
    .catch((error) => res.status(500).json(error));
};

exports.listMessage = (req, res, next) => {
  models.Message.findAll({
    attributes: ["createdAt", "titre", "contenu", "image" ],
    order: [["createdAt", "DESC"]],
  })
    .then((posts) => {
      if (posts.length > null) {
        res.status(200).json(posts);
      } else {
        res.status(404).json({ error: "Pas de post à afficher" });
      }
    })
    .catch((err) => res.status(500).json(err));
};
