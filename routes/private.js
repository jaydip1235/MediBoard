const express = require('express')
const router = require('./auth')
const {getPrivateData,findUser,editUser,deleteUser,doctor,need,needDelete,needAccept,getOthersPost,getMyPost} = require('../controllers/private')
const {protect} = require('../middleware/auth')
 
router.route('/').get(protect,getPrivateData)
router.route('/user/:userId').get(protect,findUser)
 
router.route('/user/:userId/edit').post(protect,editUser)
 
router.route("/user/:userId/delete").delete(deleteUser)
 
router.route("/user/chat/:userid/:doctor/:date/:time").post(doctor);
 
router.route('/user/:userId/edit').post(protect,editUser)
 
router.route("/postNeed").post(protect,need)
router.route("/getMyPost").get(protect,getMyPost);
router.route("/getOthersPost").get(protect,getOthersPost);
 
 
 
 
router.route("/postNeed/delete/:id").delete(protect,needDelete)
 
 
router.route("/postNeed/accept/:id").delete(protect,needAccept)
 
module.exports = router