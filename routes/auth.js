
const express = require("express");
const router = express.Router();

// Controllers
const {
  login,
  register,
  verify,
  forgotPassword,
  resetPassword,
  findUser,
  editUser,
  deleteUser,
  sendContact,
  resend
} = require("../controllers/auth");
// const router = require("./private");



router.route("/register").post(register);

router.route("/verify/:phone").post(verify)

router.route("/login").post(login);

router.route("/forgotpassword").post(forgotPassword);

router.route("/passwordreset/:resetToken").put(resetPassword);

router.route("/user/:userId").get(findUser)

router.route("/contact").post(sendContact);

router.route("/verify/:phone/resend").post(resend,verify);
// router.route("/user/:userId/create").post(editUser)

// router.route("/user/:userId/delete").delete(deleteUser)
//router.route("/editUser").post(editUser)



module.exports = router;