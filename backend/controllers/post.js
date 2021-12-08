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


    console.log("///////", req.body.content)


    models.Post.create({
        attributes: ["content", "UserId", "idMessages"],
        content: content,
        UserId: userId,
        idMessages: messageId,
    })
    .then((content) => {
        res.status(201).json( content );
      })
      .catch((error) => {
        res.status(500).json(error);
      });
  };


exports.getAllPosts = (req, res, next) => {

    models.Post.findAll({
        attributes: ["id", "content", "UserId", "idMessages", "createdAt"]
    })
    .then((posts) => {
        if (posts) {
          res.status(200).json(posts);
        } else {
          res.status(404).json({ message: "No comments found" });
        }
      })
      .catch((error) => {
        res.status(500).json(error);
      });

}