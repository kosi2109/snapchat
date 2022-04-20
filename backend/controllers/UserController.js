const generateToken = require("../config/generateToken");
const User = require("../models/userModel");


const allUsers = async (req, res) => {
  const keyword = req.query.search
  ? {
      $or: [
        { fullName: { $regex: req.query.search, $options: "i" } },
        { email: { $regex: req.query.search, $options: "i" } },
      ],
    }
  : {};

  const users = await User.find(keyword).find({ _id: { $ne: req.user._id } });
    res.send(users);
  };

const updateUser = async(req ,res)=>{
  const {pic} = req.body;
  try {
    const user = await User.findByIdAndUpdate(req.user._id,{pic},{new:true})
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


module.exports = {allUsers , updateUser}