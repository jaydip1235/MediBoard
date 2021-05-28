// const express = require('express');

// const router = express.Router();
// const {register,login,forgotpassword,resetpassword} = require('../controllers/auth')

// router.route("/register").post(register)
// router.route("/login").post(login)
// router.route("/forgotpassword").post(forgotpassword)
// router.put("/passwordreset/:resetToken",(resetpassword))


// module.exports = router;

const express = require("express");
const router = express.Router();

// Controllers
const {
  login,
  register,
  verify,
  forgotPassword,
  resetPassword,
} = require("../controllers/auth");

router.route("/register").post(register);

router.route("/verify/:phone").post(verify)

router.route("/login").post(login);

router.route("/forgotpassword").post(forgotPassword);

router.route("/passwordreset/:resetToken").put(resetPassword);

module.exports = router;