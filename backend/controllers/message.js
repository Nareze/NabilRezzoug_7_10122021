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
            UserId: user.id, // majuscules sensible à la casse
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
    attributes: ["createdAt", "titre", "contenu", "image"],
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
  }).then((user) => {
    console.log("contenu de user 1 ///////", JSON.stringify(user));
    models.Message.findAll({
      attributes: ["contenu", "titre", "image"],
      where: { UserId: user.id },
    })
      .then((message) => {
        console.log("contenu de user 1 ///////", JSON.stringify(message));
        if (message) {
          res.status(200).json(message);
        } else {
          res.status(404).json({ error: "Pas de messages à afficher" });
        }
      })
      .catch((err) => res.status(500).json(err));
  });
};

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
        console.log(
          "contenu de message 2 //////// : " + JSON.stringify(message)
        );
      }
    })
    .catch((err) => {
      res.status(500).json({ error: "cannot fetch message" });
    });
};


exports.deleteMessage = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, JWT_SIGN_SECRET);
  const userId = decodedToken.userId;

  const messageToDelete = req.body.messageId;


  models.User.findOne({
    attributes: ['id', 'email', 'username', 'isAdmin'],
    where: { id: userId }
  })
  // On trouve l'utilisateur selectionné
  .then(user => {
    console.log("contenu de user ////////", JSON.stringify(user.id))
    if (user || user.isAdmin == true){
      // Pour supprimer un message l'utilisateur ne peut être que l'admin ou le proprietaire
      models.Message.findOne({
        where:{id: messageToDelete}
      })
      // Selection du message à supprimer
      .then(message => {
        console.log("contenu de message /////////", JSON.stringify(message.UserId))
        if (message.UserId == userId){
        // L'utilisateur ne pourra supprimmer que les messages qui lui appartient
        models.Message.destroy({
          where: { id: message.id }
        })
        .then(() => res.status(201).json("Message deleted"))
        .catch(err => res.status(500).json(err))
      } else {
        res.status(405).json({ error: "Not allowed to delete others messages" });
      }
      })
    } else {
      res.status(405).json({ error: "Not allowed to delete messages" });
    }
  })
  .catch(err => res.status(500).json(err))
};
