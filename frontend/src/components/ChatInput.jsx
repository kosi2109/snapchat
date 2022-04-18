import React, { useState } from "react";
import { BsFillEmojiLaughingFill } from "react-icons/bs";
import { FiSend } from "react-icons/fi";
import { sentMessageAPI } from "../api";
import Picker from 'emoji-picker-react';


function ChatInput({ chatId, socket, messages, setMessages }) {
  const [message, setMessage] = useState("");
  const [openEmojiPicker, setOpenEmojiPicker] = useState(false);

  const onEmojiClick = (event, emojiObject) => {
    event.preventDefault();
    setMessage(message + emojiObject.emoji);
  };

  const sendMessage = () => {
    setOpenEmojiPicker(false)
    sentMessageAPI({ content: message, chatId: chatId })
      .then((res) => {
        socket.emit("new message", res.data);
        setMessages([...messages, res.data]);
        setMessage("");
      })
      .catch((error) => console.log(error));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage();
  };
  return (
    <div className="fixed bottom-0 p-3 w-full md:w-3/6" style={{left:"50%",transform:'translateX(-50%)'}}>
      <form
        onSubmit={handleSubmit}
        className="bg-bgSecondary h-12 rounded-lg flex justify-between px-3 items-center"
      >
        <button type="button" className="flex justify-center items-center mx-1 relative">
          <BsFillEmojiLaughingFill className="text-primary" size={25} onClick={()=>setOpenEmojiPicker(!openEmojiPicker)} />
          {openEmojiPicker && 
          <div className="absolute" style={{bottom:"200%",left:0}}>
            <Picker onEmojiClick={onEmojiClick} disableSearchBar />
          </div>
          }
        </button>
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          type="text"
          className="w-5/6 outline-none border-none p-1 bg-bgSecondary"
          placeholder="Tap to Type"
        />
        <button className="flex justify-center items-center mx-1">
          <FiSend className="text-primary" size={25} />
        </button>
      </form>
    </div>
  );
}

export default ChatInput;
