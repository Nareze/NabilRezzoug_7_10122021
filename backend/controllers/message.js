const models = require("../models");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const sequelize = require("sequelize")
dotenv.config();

exports.createMessage = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  console.log("token:///////:", token)
  const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
  const userId = decodedToken.userId;


  models.User.findOne({
    attributes: ["id", "email", "username"],
    where: { id: userId },
  })
  .then((user) => {
    if ((req.body.titre == "") || (req.body.contenu == "")) {
          
      res.status(400).json({ error: "Empty message" });
    } else {

        if (req.file) {     // si une image est envoyé alors ...
          let imageUrl;
          imageUrl = `${req.protocol}://${req.get("host")}/images/${
            req.file.filename
          }`;
          models.Message.create({
            UserId: user.id, // majuscules sensible à la casse
            contenu: req.body.contenu,
            titre: req.body.titre,
            image: imageUrl,
          })
          
          .then((message) => {
            res.status(201).json(message)
          })
          .catch((err) => {
            res.status(500).json(err);
          });
      
        }

        if (!req.file) {
          models.Message.create({
            UserId: user.id,
            contenu: req.body.contenu,
            titre: req.body.titre,
          })
            .then((message) => {
              res.status(201).json(message);
            })
            .catch((err) => {
              res.status(500).json(err);
            });
        }
      }

    })
    .catch((error) => res.status(500).json(error));
};

exports.getAllUsersMessages = (req, res, next) => {
  models.Message.findAll({
    attributes: ["createdAt", "titre", "contenu", "image", "UserId", "id",[
      sequelize.fn(
        "date_format",
        sequelize.col("createdAt"),
        "%d %M %Y - %H:%i:%s "
      ),
      "createdAt",
    ],],
    order: [["createdAt", "DESC"]],
  })
    .then((messages) => {
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
  const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
  const userId = decodedToken.userId;


  models.User.findOne({
    attributes: ["id", "email", "username"],
    where: { id: userId },
  }).then((user) => {
    models.Message.findAll({
      attributes: ["contenu", "titre", "image"],
      where: { UserId: user.id },
    })
      .then((message) => {
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
      }
    })
    .catch(() => {
      res.status(500).json({ error });
    });
};

exports.removeMessage = (req, res, next) => {
  const messageId = req.params.messageId;
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
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
          // L'utilisateur ne pourra supprimmer que les messages lui appartenant
          if (message.UserId == userId || user.isAdmin == true) {
            models.Message.destroy({
              where: { id: messageId },
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

  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
  const userId = decodedToken.userId;


  models.User.findOne({
    attributes: ["id", "email", "username", "isAdmin"],
    where: { id: userId },
  })
  .then((user) => {
    if (user || user.isAdmin == true) {
      models.Message.findOne({
        where: {id: messageId}
      }) .then((message) => {
        if (message.UserId == userId || user.isAdmin == true) {
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
      }).catch((err) => res.status(500).json(err));
        } else {
          res
            .status(405)
            .json({ error: "Not allowed to modify others messages" });
        }
      })

    }
  })




  // models.Message.findOne({
  //   where: {id: messageId}
  // }).then((message) => {
  //   if (message){
  //     message.update({
  //       titre:titre,
  //       contenu: contenu,
  //       image: req.file ? `${req.protocol}://${req.get("host")}/images/${req.file.filename}` : message.image,
  //     })
  //     .then((message) => {
  //       res.status(200).json({
  //         message:"Post updated",
  //         message: message,
  //       })
  //     })
  //     .catch(() => {
  //       res.status(500).json({
  //         message:"Not updated"
  //       })
  //     })
  //   } else {
  //     res.status(404).json({
  //       message:"Post not found"
  //     })
  //   }
  // })




};
