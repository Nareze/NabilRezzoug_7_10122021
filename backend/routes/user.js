const express = require("express");
const router = express.Router();
const userCtrl = require('../controllers/user');
const auth = require('../middlewares/auth');
const emailCtrl = require('../middlewares/checkEmail');
const passwordCtrl = require('../middlewares/checkPassword');
const checkInput = require('../middlewares/checkInput');


router.post("/signup", checkInput.checkSignUp, checkInput.checkUsername, emailCtrl, passwordCtrl, userCtrl.signup);
router.post("/login", checkInput.checkLoginInput, userCtrl.login);
router.get("/profiles", auth, userCtrl.profiles);   // voir tout les profils
router.get("/profile", auth, userCtrl.profile);      // voir un profil
router.put("/modify", auth, /* passwordCtrl, checkInput.checkUsername, */ userCtrl.modify); // modifier un profil
router.delete("/delete", auth, userCtrl.deleteProfile);  // supprimer un profil

router.get("/logout", auth, userCtrl.logout)


module.exports = router;



