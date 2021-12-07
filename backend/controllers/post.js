const models = require("../models");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();




exports.createPost = (req, res, next) => {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decodedToken.userId;
    const messageId = req.params.idMessage;
    const content = req.body.content;


    models.Post.create({
        attributes: ["content", "idUsers", "idPosts"],
        content: content,
        idUsers: userId,
        idMessage: messageId,
    })
    .then((comment) => {
        res.status(201).json({ content: comment});
      })
      .catch((error) => {
        res.status(500).json(error);
      });
  };


exports.getAllPosts = (req, res, next) => {

    models.Post.findAll({
        attributes: ["id", "content", "idUsers", "idPosts", "createdAt"]
    })
    .then((commentsFound) => {
        if (commentsFound) {
          res.status(200).json({ comments: commentsFound });
        } else {
          res.status(404).json({ message: "No comments found" });
        }
      })
      .catch((error) => {
        res.status(500).json(error);
      });

}