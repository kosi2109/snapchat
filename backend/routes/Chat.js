const express =require("express")
const { allChats , accessChat , getChat ,accessGroupChat , removeUser , addUser} = require("../controllers/ChatController")
const protect = require("../middlewares/authMiddleware")

const router = express.Router()


router.post('/',protect,accessChat)
router.get('/',protect,allChats)

router.post('/group',protect,accessGroupChat)
router.post('/remove-user',protect,removeUser)
router.post('/add-user',protect,addUser)


router.get('/:id',protect,getChat)

module.exports = router