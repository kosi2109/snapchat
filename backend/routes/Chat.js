const express =require("express")
const { allChats , accessChat , getChat ,accessGroupChat , removeUser , addUser,changeGroupName , deleteChat} = require("../controllers/ChatController")
const protect = require("../middlewares/authMiddleware")

const router = express.Router()


router.post('/',protect,accessChat)
router.get('/',protect,allChats)

router.post('/group',protect,accessGroupChat)
router.post('/remove-user',protect,removeUser)
router.post('/add-user',protect,addUser)
router.post('/changeGroupName',protect,changeGroupName)
router.post('/delete',protect,deleteChat)


router.get('/:id',protect,getChat)

module.exports = router