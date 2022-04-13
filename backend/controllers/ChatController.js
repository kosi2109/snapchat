const Chat = require("../models/chatModel");

const allChats = async (req, res) => {
  try {
    const chats = await Chat.find({ users: req.user._id })
      .populate("users", "-password")
      .populate("groupAdmin", "-password")
      .populate({
        path: "latestMessage",
        populate: { path: "sender", select: "-password" },
      })
      .sort({ updatedAt: -1 });
    res.status(201).json(chats);
  } catch (error) {
    console.log(error);
  }
};

const accessChat = async (req, res) => {
  const { userId } = req.body;

  if (!userId) {
    console.log("UserId param not sent with request");
    return res.sendStatus(400);
  }

  let isChat = await Chat.find({
    isGroupChat: false,
    $and: [
      { users: { $elemMatch: { $eq: req.user._id } } },
      { users: { $elemMatch: { $eq: userId } } },
    ],
  })
    .populate("users", "-password")
    .populate({
      path: "latestMessage",
      populate: { path: "sender", select: "-password" },
    });

  if (isChat.length > 0) {
    return res.status(201).json(isChat[0]);
  } else {
    let chatData = {
      chatName: "sender",
      isGroupChat: false,
      users: [req.user._id, userId],
    };

    try {
      const chat = await Chat.create(chatData);
      const fullChat = await Chat.findById(chat._id).populate(
        "users",
        "-password"
      );
      res.status(200).json(fullChat);
    } catch (error) {
      res.status(400);
      throw new Error(error.message);
    }
  }
};



const getChat = async (req, res) => {
  const { id } = req.params;
  try {
    const chat = await Chat.findById(id)
      .populate("users", "-password")
      .populate({
        path: "latestMessage",
        populate: { path: "sender", select: "-password" },
      });

    return res.status(201).json(chat);
  } catch (error) {
    console.log(error);
  }
};




const accessGroupChat = async (req, res) => {
  const { gpName , users } = req.body;

  if (!gpName || gpName === ""){
    return res.sendStatus(400).json({error: "Gp Name require"});
  }

  if (users.length < 2) {
    return res.sendStatus(400).json({error: "At least 3 members required"});
  }
    
    let chatData = {
      chatName: gpName,
      isGroupChat: true,
      users: [String(req.user._id), ...users],
      groupAdmin : String(req.user._id)
    };
    try {
      const chat = await Chat.create(chatData);
      const fullChat = await Chat.findById(chat._id).populate(
        "users",
        "-password"
      );
      return res.status(200).json(fullChat);
    } catch (error) {
      return res.sendStatus(400).json(error);
    }
  
};

module.exports = { allChats, accessChat, getChat , accessGroupChat};
