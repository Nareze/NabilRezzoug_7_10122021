const models = require("../models");

exports.createMessage = (req, res, next) => {
  // let headerAuth = req.headers['authorization'];
  // let userId = jwtUtils.getUserId(headerAuth);
  // console.log= userId;

  // const token = req.headers.authorization.split(" ")[1];
  // const decodedToken = jwt.verify(token, JWT_SIGN_SECRET);
  // const userId = decodedToken.userId;

  const userId = req.params.id;

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
      console.log("messages/////////", messages)
      if (messages != null) {
        res.status(200).json(messages);
      } else {
        res.status(404).json({ error: "Cannot display messages" });
      }
    })
    .catch((err) => res.status(500).json(err));
};

exports.getUserMessages = (req, res, next) => {
  let userId = req.params.id;

  models.User.findOne({
    attributes: ["id", "email", "username"],
    where: { id: userId },
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

exports.getOneUserMessage = (req, res, next) => {
  let id = req.params.id;

  models.Message.findOne({
    attributes: ["titre", "contenu", "image"],
    where: { id: id },
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
    .catch(() => {
      res.status(500).json({ error });
    });
};


exports.removeMessage = (req, res, next) => {
  const userId = req.params.id;
  const messageId = req.body.messageId;
  // On cherche le propriétaire du message
  models.User.findOne({
    attributes: ['id', 'email', 'username', 'isAdmin'],
    where: { id: userId }
  })
  .then(user => {
    // Pour supprimer un message on verifie que l'utilisateur est soit l'admin ou soit le proprietaire
     if (user || user.isAdmin == true){
    // Selection du message à supprimer
      models.Message.findOne({
        where:{id: messageId}
      })
      .then(message => {
        console.log("contenu de message /////////", JSON.stringify(message.UserId))
    // L'utilisateur ne pourra supprimmer que les messages lui appartenant
        if (message.UserId == userId || user.isAdmin == true){
        models.Message.destroy({
          where: { id: message.id }
        })
        .then(() => res.status(201).json("Message deleted"))
        .catch(err => res.status(500).json(err))
      } else {
        res.status(405).json({ error: "Not allowed to delete others messages" });
      }
      })
    }  
    else {
      res.status(405).json({ error: "Not allowed to delete messages" });
    }
  })
  .catch(() => res.status(500).json({error: "Unable to delete"}))
};