const express = require('express')
const router = express.Router();

const auth = require('../middlewares/auth')
const messageCtrl = require('../controllers/message')
const multer = require('../middlewares/multer-config')


router.post("/create/:id", auth, multer, messageCtrl.createMessage);
router.delete("/remove/:id", auth, messageCtrl.removeMessage)
router.get("/user/:id", messageCtrl.getUserMessages);       // voir tout les messages de l'utlisateur selectionné

router.get("/users", auth, messageCtrl.getAllUsersMessages);  // voir tout les messages
router.get("/one", messageCtrl.getOneUserMessages);     // voir un message de l'utilisateur


module.exports = router;