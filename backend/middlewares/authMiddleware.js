const jwt = require('jsonwebtoken')
const User = require('../models/userModel');


const protect = async (req,res,next)=>{
    var token;
    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
        try {
            token = req.headers.authorization.split(' ')[1]
            const {id} = jwt.verify(token,process.env.JWT_SECRET)
            const user = await User.findById(id).select('-password')

            req.user = user
            next()
        } catch (error) {
            console.log(error);
            res.status(401).json({error : "invalid token"})
        }
    }

    if (!token){
        res.status(401).json({error : "token not found"})
    }
}


module.exports = protect