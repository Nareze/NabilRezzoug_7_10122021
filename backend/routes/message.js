const express = require('express')
const router = express.Router();

const auth = require('../middlewares/auth')
const messageCtrl = require('../controllers/message')
const multer = require('../middlewares/multer-config')


router.post("/create", auth, multer, messageCtrl.createMessage);
router.get("/users", /*auth,*/ messageCtrl.getAllUsersMessages);  // voir tout les messages

router.get("/", messageCtrl.getOneUserMessage);     // voir un message de l'utilisateur
router.delete("/remove", auth, messageCtrl.removeMessage);
router.get("/user", messageCtrl.getUserMessages);      // voir tout les messages d'un utlisateur

// modifier message

router.put("/modify/:id", multer, messageCtrl.modifyMessage);

// document.cookie


module.exports = router;