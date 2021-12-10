const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const postCtrl = require("../controllers/post");

router.post("/:idMessage", auth, postCtrl.createPost);
router.get("/", auth, postCtrl.getAllPosts);

module.exports = router;
