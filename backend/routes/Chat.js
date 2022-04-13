const express =require("express")
const { allChats , accessChat , getChat ,accessGroupChat} = require("../controllers/ChatController")
const protect = require("../middlewares/authMiddleware")

const router = express.Router()


router.post('/',protect,accessChat)
router.get('/',protect,allChats)

router.post('/group',protect,accessGroupChat)

router.get('/:id',protect,getChat)

module.exports = router