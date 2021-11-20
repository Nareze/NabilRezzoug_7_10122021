const express = require('express')
const router = express.Router();

const auth = require('../middlewares/auth')
const messageCtrl = require('../controllers/message')
const multer = require('../middlewares/multer-config')


router.post("/create", auth, multer, messageCtrl.createMessage);

router.get("/users", messageCtrl.getAllUsersMessages);  // voir tout les messages
router.get("/user", messageCtrl.getUserMessages);       // voir tout les messages de l'utlisateur selectionné
router.get("/one", messageCtrl.getOneUserMessages);     // voir un message de l'utilisateur

router.delete("/remove", auth, messageCtrl.deleteMessage)

module.exports = router;