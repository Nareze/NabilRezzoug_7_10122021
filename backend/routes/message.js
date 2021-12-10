const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const messageCtrl = require("../controllers/message");
const multer = require("../middlewares/multer-config");

router.post("/create", auth, multer, messageCtrl.createMessage);
router.get("/users", auth, messageCtrl.getAllUsersMessages); // voir tout les messages
router.delete("/:messageId", auth, messageCtrl.removeMessage);
router.put("/:id", auth, multer, messageCtrl.modifyMessage);

//    Ajouts supplémentaires facultatifs :
// router.get("/", messageCtrl.getOneUserMessage);
// router.get("/user", messageCtrl.getUserMessages);

module.exports = router;
