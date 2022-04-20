const express = require('express')
const { allUsers , updateUser } = require('../controllers/UserController')
const protect = require("../middlewares/authMiddleware")

const route = express.Router()

route.get('/',protect, allUsers);

route.post('/update',protect, updateUser);

module.exports = route