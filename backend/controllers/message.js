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
            titre: req.body.titre,
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
            titre: req.body.titre,
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

exports.getAllUsersMessages = (req, res, next) => {
  models.Message.findAll({
    attributes: ["createdAt", "titre", "contenu", "image" ],
    order: [["createdAt", "DESC"]],
  })
    .then((messages) => {
      if (messages.length > null) {
        res.status(200).json(messages);
      } else {
        res.status(404).json({ error: "Pas de messages à afficher" });
      }
    })
    .catch((err) => res.status(500).json(err));
};



exports.getUserMessages = (req, res, next) => {

  let username = req.body.username;

  models.User.findOne({
    attributes: ["id", "email", "username"],
    where: { username: username },
  })
  .then((user) => {
      console.log("contenu de user 1 ///////", JSON.stringify(user))
      models.Message.findAll({
        attributes: ["contenu", "titre", "image"],
        where: { UserId: user.id },
      })
        .then((message) => {
          console.log("contenu de user 1 ///////", JSON.stringify(message))
          if (message) {
            res.status(200).json(message);
          } else {
            res.status(404).json({ error: "Pas de messages à afficher" });
          }
        })
        .catch((err) => res.status(500).json(err));
})

}


exports.getOneUserMessages = (req, res, next) => {

  let titre = req.body.titre;

  models.Message.findOne({
    attributes: ["titre", "contenu", "image"],
    where: { titre: titre },
  })
  .then((message) => {
    if (!message) {
      res.status(404).json({ error: "Rien à afficher" });
    } else {
      res.status(201).json(message);
      console.log("contenu de message 2 //////// : " + JSON.stringify(message));
    }
  })
  .catch((err) => {
    res.status(500).json({ error: "cannot fetch message" });
  });
};