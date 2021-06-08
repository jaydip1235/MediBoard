const express = require('express')
const router = require('./auth')
const {getPrivateData,findUser,editUser,deleteUser} = require('../controllers/private')
const {protect} = require('../middleware/auth')

//router.route('/').get(protect,getPrivateData)
router.route('/user/:userId').get(protect,findUser)

router.route('/user/:userId/edit').get(protect,editUser)

router.route("/user/:userId/delete").delete(protect,deleteUser)

module.exports = router