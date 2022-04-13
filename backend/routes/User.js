const express = require('express')
const { allUsers } = require('../controllers/UserController')
const protect = require("../middlewares/authMiddleware")

const route = express.Router()

route.route("/").get(protect, allUsers);

module.exports = route