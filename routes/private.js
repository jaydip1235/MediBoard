const express = require('express')
const router = require('./auth')
const {getPrivateData} = require('../controllers/private')
const {protect} = require('../middleware/auth')

router.route('/').get(protect,getPrivateData)

module.exports = router