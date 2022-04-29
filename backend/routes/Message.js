const express = require('express')
const { allMessages , sendMessage } = require('../controllers/MessageController')
const protect = require("../middlewares/authMiddleware")

const route = express.Router()

route.get('/:chatId',protect,allMessages)
route.post('/',protect,sendMessage)

module.exports = route