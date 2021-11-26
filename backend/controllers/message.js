const models = require("../models");
const jwt = require("jsonwebtoken");
const JWT_SIGN_SECRET = "mdpsecret";

exports.createMessage = (req, res, next) => {
  // let headerAuth = req.headers['authorization'];
  // let userId = jwtUtils.getUserId(headerAuth);
  // console.log= userId;

  // const cookie = req.cookies.access_token;
  // const decodedCookie = jwt.verify(cookie, "JWT_SIGN_SECRET");
  // const userId = decodedCookie.userId;

  const token = req.headers.authorization.split(" ")[1];
  console.log("token:///////:", token)
  const decodedToken = jwt.verify(token, JWT_SIGN_SECRET);
  const userId = decodedToken.userId;




  models.User.findOne({
    attributes: ["id", "email", "username"],
    where: { id: userId },
  })

    .then((user) => {
      
        if (req.file !== undefined) {
          let imageUrl;
          imageUrl = `${req.protocol}://${req.get("host")}/images/${
            req.file.filename
          }`;
          models.Message.create({
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

        if (req.body.contenu !== undefined) {
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

        if (req.body.contenu == undefined && req.file == undefined) {
          res.status(400).json({ error: "Empty message" });
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
      console.log("messages/////////", messages);
      if (messages != null) {
        res.status(200).json(messages);
      } else {
        res.status(404).json({ error: "Cannot display messages" });
      }
    })
    .catch((err) => res.status(500).json(err));
};

exports.getUserMessages = (req, res, next) => {
  // const cookie = req.cookies.access_token;
  // const decodedCookie = jwt.verify(cookie, "JWT_SIGN_SECRET");
  // const userId = decodedCookie.userId;

  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, JWT_SIGN_SECRET);
  const userId = decodedToken.userId;


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
  const messageId = req.body.messageId;

  models.Message.findOne({
    attributes: ["titre", "contenu", "image"],
    where: { id: messageId },
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
  const messageId = req.body.messageId;

  // const cookie = req.cookies.access_token;
  // const decodedCookie = jwt.verify(cookie, "JWT_SIGN_SECRET");
  // const userId = decodedCookie.userId;

  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, JWT_SIGN_SECRET);
  const userId = decodedToken.userId;


  // On cherche le propriétaire du message
  models.User.findOne({
    attributes: ["id", "email", "username", "isAdmin"],
    where: { id: userId },
  })
    .then((user) => {
      // Pour supprimer un message on verifie que l'utilisateur est soit l'admin ou soit le proprietaire
      if (user || user.isAdmin == true) {
        // Selection du message à supprimer
        models.Message.findOne({
          where: { id: messageId },
        }).then((message) => {
          console.log(
            "contenu de message /////////",
            JSON.stringify(message.UserId)
          );
          // L'utilisateur ne pourra supprimmer que les messages lui appartenant
          if (message.UserId == userId || user.isAdmin == true) {
            models.Message.destroy({
              where: { id: message.id },
            })
              .then(() => res.status(201).json("Message deleted"))
              .catch((err) => res.status(500).json(err));
          } else {
            res
              .status(405)
              .json({ error: "Not allowed to delete others messages" });
          }
        });
      } else {
        res.status(405).json({ error: "Not allowed to delete messages" });
      }
    })
    .catch(() => res.status(500).json({ error: "Unable to delete" }));
};

exports.modifyMessage = (req, res, next) => {
  
  const messageId = req.params.id;
  const titre = req.body.newtitre;
  const contenu = req.body.newcontenu;

  console.log("////////:", req.file)


  models.Message.findOne({
    where: {id: messageId}
  }).then((message) => {
    console.log("////////:", message.image)
    if (message){
      console.log(req.file)
      message.update({
        titre:titre,
        contenu: contenu,
        image: req.file ? `${req.protocol}://${req.get("host")}/images/${req.file.filename}` : message.image,
      })
      .then((message) => {
        res.status(200).json({
          message:"Post updated",
          message: message,
        })
      })
      .catch(() => {
        res.status(500).json({
          message:"Not updated"
        })
      })
    } else {
      res.status(404).json({
        message:"Post not found"
      })
    }
  })
};
