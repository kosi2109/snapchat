const generateToken = require("../config/generateToken");
const User = require("../models/userModel");

const createUser = async (req, res) => {
  const { email, password , password2 , fullName } = req.body;

  if (fullName === "" || email === "" || password === ""){
    return res.status(401).json({ error: " All fields are required ." });
  }

  if(password !== password2){
    return res.status(401).json({ error: "Password doesn't match" });
  }
  
  const exist = await User.findOne({email})

  if(exist){
      return res.status(401).json({error : "User Already exist ."})
  }
  
  const user = await User.create({email,password,fullName})

  if (user){
    return res.status(201).json({
        _id : user._id,
        email : user.email,
        fullName : user.fullName,
        pic : user.pic,
        token : generateToken(user._id)
      })
  }else{
    return  res.status(400).json({error: "Unknown error occour"})
  }

};


const login = async (req,res)=>{
  const {email,password} = req.body;
  try {
    const user = await User.findOne({email});
    if(!user){
      return res.status(401).json({error : "User not exist ."})
    }    
    const correctPass = await user.matchPassword(password)
    
    if(!correctPass){
      return res.status(401).json({error : "Password Not Correct"})
    }

    return res.status(201).json({
      _id : user._id,
      email : user.email,
      fullName : user.fullName,
      pic : user.pic,
      token : generateToken(user._id)
    })

  } catch (error) {
    console.log(error);
  }
}

module.exports = {createUser , login};
