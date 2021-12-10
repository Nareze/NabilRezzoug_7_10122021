const express = require("express");
const router = express.Router();
const userCtrl = require("../controllers/user");
const auth = require("../middlewares/auth");
const emailCtrl = require("../middlewares/checkEmail");
const passwordCtrl = require("../middlewares/checkPassword");
const checkInput = require("../middlewares/checkInput");

router.post(
  "/signup",
  checkInput.checkSignUp,
  checkInput.checkUsername,
  emailCtrl,
  passwordCtrl,
  userCtrl.signup
);
router.post("/login", checkInput.checkLoginInput, userCtrl.login);
router.get("/profiles", auth, userCtrl.profiles); // voir tout les profils
router.get("/profile", auth, userCtrl.profile);
router.put(
  "/modify",
  auth,
  passwordCtrl,
  checkInput.checkUsername,
  userCtrl.modify
);
router.delete("/delete", auth, userCtrl.deleteProfile);

// Autre méthode de déconnexion possible :
// router.get("/logout", auth, userCtrl.logout)

module.exports = router;
