const express = require('express')
const router = express.Router();

const messageCtrl = require('../controllers/message')
const multer = require('../middlewares/multer-config')


router.post("/create", multer, messageCtrl.createMessage);

router.get("/users", messageCtrl.getAllUsersMessages);  // voir tout les messages
router.get("/user", messageCtrl.getUserMessages);       // voir tout les messages de l'utlisateur
router.get("/one", messageCtrl.getOneUserMessages);     // voir un message de l'utilisateur
//delete

module.exports = router;