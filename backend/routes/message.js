const express = require('express')
const router = express.Router();

const auth = require('../middlewares/auth')
const messageCtrl = require('../controllers/message')
const multer = require('../middlewares/multer-config')


router.post("/create/:id", auth, multer, messageCtrl.createMessage);
router.get("/users", /*auth,*/ messageCtrl.getAllUsersMessages);  // voir tout les messages
router.get("/:id", messageCtrl.getOneUserMessage);     // voir un message de l'utilisateur

router.delete("/remove/:id", auth, messageCtrl.removeMessage);
router.get("/user/:id", messageCtrl.getUserMessages);      // voir tout les messages d'un utlisateur







module.exports = router;