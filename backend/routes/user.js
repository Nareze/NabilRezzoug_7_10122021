const express = require("express");
const router = express.Router();

const userCtrl = require('../controllers/user');
const auth = require('../middlewares/auth');
const emailCtrl = require('../middlewares/checkEmail')
const passwordCtrl = require('../middlewares/checkPassword')

const checkInput = require('../middlewares/checkInput')


router.post("/signup", checkInput.checkSignUpInput, emailCtrl, passwordCtrl, userCtrl.signup);
router.post("/login", checkInput.checkLoginInput, userCtrl.login);

router.get("/profile", auth, userCtrl.profile)      // voir un profil
router.get("/profiles", auth, userCtrl.profiles)    // voir tout les profils
router.delete("/delete", auth, userCtrl.deleteProfile)  // supprimer un profil

router.put("/modify", userCtrl.modify)

module.exports = router;



