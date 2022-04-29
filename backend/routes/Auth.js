const express = require('express')
const { createUser , login} = require('../controllers/Auth')

const route = express.Router()

route.post('/register',createUser)
route.post('/login',login)

module.exports = route