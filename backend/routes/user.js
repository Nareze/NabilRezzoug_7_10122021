const express = require("express");
const router = express.Router();

const userCtrl = require('../controllers/user');
const auth = require('../middlewares/auth')

router.post("/signup", userCtrl.signup);
router.post("/login", userCtrl.login);
router.get("/profile", auth, userCtrl.profile)
router.delete("/delete", auth, userCtrl.deleteProfile)

module.exports = router;



