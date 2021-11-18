const express = require('express')
const router = express.Router();

const messageCtrl = require('../controllers/message')
const multer = require('../middlewares/multer-config')

router.post("/create", multer, messageCtrl.createMessage);
router.get("/", messageCtrl.listMessage);
//delete

module.exports = router;