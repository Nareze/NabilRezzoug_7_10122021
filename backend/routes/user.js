const express = require("express");
const router = express.Router();

const userCtrl = require('../controllers/user');
const auth = require('../middlewares/auth');
const emailCtrl = require('../middlewares/checkEmail')
const passwordCtrl = require('../middlewares/checkPassword')

const checkInput = require('../middlewares/checkInput')

router.post("/signup", checkInput.checkSignUpInput, emailCtrl, passwordCtrl, userCtrl.signup);
router.post("/login", checkInput.checkLoginInput, userCtrl.login);
router.get("/profile", auth, userCtrl.profile)
router.delete("/delete", auth, userCtrl.deleteProfile)
//update

module.exports = router;



