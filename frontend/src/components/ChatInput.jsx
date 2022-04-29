import React, { useEffect, useState } from "react";
import { BsFillEmojiLaughingFill } from "react-icons/bs";
import { FiSend } from "react-icons/fi";
import Picker from "emoji-picker-react";
import { useDispatch, useSelector } from "react-redux";
import { sentMessage } from "../action/messageAction";

function ChatInput({ socket }) {
  const [message, setMessage] = useState("");
  const [openEmojiPicker, setOpenEmojiPicker] = useState(false);
  const [typing, setTyping] = useState(false)
  const { selectChat } = useSelector((state) => state.chats);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const onEmojiClick = (event, emojiObject) => {
    event.preventDefault();
    setMessage(message + emojiObject.emoji);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(sentMessage({ content: message, chatId: selectChat._id }, socket));
    setOpenEmojiPicker(false);
    setMessage("");
  };

  const typingHandaler = (e)=>{
    setMessage(e.target.value)

    if (!typing && message !== ''){
      setTyping(true)
      socket.emit('start typing',{chat:selectChat,sender:user})
    }
  }
  
  useEffect(()=>{
    if (selectChat){
      const delayFn = setTimeout(() => {
        setTyping(false)
        socket.emit('stop typing',{chat:selectChat,sender:user})
      }, 3000);
      return () => clearTimeout(delayFn);
    }
  },[message,selectChat])

  return (
    <div
      className="fixed bottom-5 p-3 w-full md:w-3/6"
      style={{ left: "50%", transform: "translateX(-50%)" }}
    >
      
      <form
        onSubmit={handleSubmit}
        className="bg-bgSecondary h-12 rounded-lg flex justify-between px-3 items-center"
      >
        <button
          type="button"
          className="flex justify-center items-center mx-1 relative outline-none border-none"
        >
          <BsFillEmojiLaughingFill
            className="text-primary"
            size={25}
            onClick={() => setOpenEmojiPicker(!openEmojiPicker)}
          />
          {openEmojiPicker && (
            <div className="absolute" style={{ bottom: "200%", left: 0 }}>
              <Picker onEmojiClick={onEmojiClick} disableSearchBar />
            </div>
          )}
        </button>
        <input
          value={message}
          onChange={typingHandaler}
          type="text"
          className="w-5/6 outline-none border-none p-1 bg-bgSecondary"
          placeholder="Tap to Type"
        />
        <button className="flex justify-center items-center mx-1 outline-none border-none">
          <FiSend className="text-primary" size={25} />
        </button>
      </form>
    </div>
  );
}

export default ChatInput;
