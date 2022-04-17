const mongoose  = require("mongoose");
const Message = require("./messageModel");


const chatSchema = mongoose.Schema({
    chatName: { type: String, trim: true },
    isGroupChat: { type: Boolean, default: false },
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    latestMessage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message",
    },
    groupAdmin: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
})


chatSchema.pre('remove', function(next) {
  Message.find({ chat: this.id }, (err, messages) => {
    if (err) {
      next(err)
    } else if (messages.length > 0) {
      messages.forEach(message=>{
        message.delete()
      })
      next()
    } else {
      next()
    }
  })
})


const Chat = mongoose.model("Chat", chatSchema);

module.exports = Chat;