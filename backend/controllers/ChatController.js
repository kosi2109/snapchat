const Chat = require("../models/chatModel");
const ObjectId = require('mongoose').Types.ObjectId;

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
      const fullChat = await Chat.findById(chat._id)
        .populate("users", "-password")
        .populate("groupAdmin", "-password");
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
      })
      .populate("groupAdmin", "-password");
    
      
      if (!chat){
        return res.status(404).json({error:"Chat Not Found"});
      }

      const include = chat.users.some(user => String(user._id) === String(req.user._id))
     
      if (!include){
        return res.status(404).json({error:"Chat Not Found"})
      }
      
    return res.status(201).json(chat);
  } catch (error) {
    return res.status(404).json({error:error.message});
  }
};

const accessGroupChat = async (req, res) => {
  const { gpName, users } = req.body;

  if (!gpName || gpName === "") {
    return res.status(400).json({ error: "Gp Name require" });
  }

  if (users.length < 2) {
    return res.status(400).json({ error: "At least 3 members required" });
  }

  let chatData = {
    chatName: gpName,
    isGroupChat: true,
    users: [String(req.user._id), ...users],
    groupAdmin: String(req.user._id),
  };
  try {
    const chat = await Chat.create(chatData);
    const fullChat = await Chat.findById(chat._id)
      .populate("users", "-password")
      .populate("groupAdmin", "-password");
    return res.status(200).json(fullChat);
  } catch (error) {
    return res.sendStatus(400).json({error:error.message});
  }
};

const removeUser = async (req, res) => {
  const { chatId, userId } = req.body;
  try {
    const chat = await Chat.findById(chatId)
      .populate("users", "-password")
      .populate("groupAdmin", "-password");

    if (!chat) {
      return res.status(401).json({ error: "Chat Not Found" });
    }

    if (String(chat.groupAdmin._id) !== String(req.user._id)) {
      return res
        .status(401)
        .json({ error: "You Are Not Authenticate to remove user ." });
    }

    if (String(chat.groupAdmin._id) === userId) {
      return res.status(401).json({ error: "You Can't remove group admin ." });
    }

    chat.users = chat.users.filter((user) => String(user._id) !== userId);
    chat.save();

    return res.status(200).json(chat);
  } catch (error) {
    return res.sendStatus(400).json({error:error.message});
  }
};

const addUser = async (req, res) => {
  const { chatId, addUsers } = req.body;
  try {
    const chat = await Chat.findById(chatId)
      .populate("users", "-password")
      .populate("groupAdmin", "-password");

    if (!chat) {
      return res.status(401).json({ error: "Chat Not Found" });
    }
    const users = chat.users.map((user) => String(user._id));

    addUsers.forEach((user) => {
      const exist = users.includes(user._id);
      if (!exist) {
        chat.users.push(user);
      }
    });
    chat.save();
    return res.status(200).json(chat);
  } catch (error) {
    return res.sendStatus(400).json({error:error.message});
  }
};

const changeGroupName = async (req, res) => {
  const { chatId , name } = req.body;

  
  try {
    const chat = await Chat.findById(chatId).populate("users", "-password")
    .populate("groupAdmin", "-password");;

    if (!chat) {
      return res.status(404).json({ error: "Chat not Found ." });
    }

    if(!chat.isGroupChat){
      return res.status(404).json({ error: "Something wrong" });
    }

    chat.chatName = name;
    chat.save()
    return res.status(200).json(chat);

  } catch (error) {
    return res.sendStatus(400).json({error:error.message});
  }
};

const deleteChat = async (req, res) => {
  const { chatId } = req.body;
  try {
    const chat = await Chat.findById(chatId).populate("groupAdmin", "_id");

    if (!chat) {
      return res.status(404).json({ error: "Chat not Found ." });
    }

    if (chat.isGroupChat && String(chat.groupAdmin._id) !== String(req.user._id)) {
      return res
        .status(401)
        .json({ error: "Only Group Admin can delete chat ." });
    }
    await chat.delete();
    return res
      .status(200)
      .json({ success: "Chat has been successfully deleted ." });
  } catch (error) {
    return res.sendStatus(400).json({error:error.message});
  }
};

module.exports = {
  allChats,
  accessChat,
  getChat,
  accessGroupChat,
  removeUser,
  addUser,
  changeGroupName,
  deleteChat,
};
