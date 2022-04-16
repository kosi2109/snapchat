import React, { useEffect, useRef, useState } from "react";
import ChatHeader from "../components/ChatHeader";
import { motion } from "framer-motion";
import ChatInput from "../components/ChatInput";
import axios from "axios";
import MessageByAuth from "../components/MessageByAuth";
import MessageByOther from "../components/MessageByOther";
import { ChatState } from "../Context/ChatProvider";
import { useParams } from "react-router-dom";

function Chat({socket}) {
  const {id} = useParams()
  const messgeRef = useRef()
  const { selectChat , setSelectChat ,user ,messages,setMessages } = ChatState()
  
  const config = {
    headers: { Authorization: `Bearer ${user?.token}` },
  };

  const getMessages = () => {
    axios
      .get(`http://localhost:5000/api/message/${id}`, config)
      .then((res) => {
        setMessages(res.data);
      })
      .catch((error) => console.log(error));
  };

  const chat = ()=>{
    if(user){
      axios
      .get(`http://localhost:5000/api/chat/${id}`,config)
      .then((res) => {
        setSelectChat(res.data)
      })
      .catch((error) => console.log(error));
    }
  }

  useEffect(()=>{
    if(!selectChat){
      chat()
    }
  },[user])

  useEffect(() => {
    if (selectChat && user){
      getMessages();
      socket.emit('join chat',selectChat._id)
    }
  }, [selectChat]);
  

  useEffect(()=>{
    if(messgeRef){
      messgeRef.current.scrollTop = messgeRef.current.scrollHeight
    }
  },[messgeRef,messages])
  
  return (
    <motion.div
      className="w-full h-full"
      exit={{ x: "-100%", transition: { ease: "easeIn" } }}
    >
      <ChatHeader />
      <div className="w-full py-16 h-full">
        <div ref={messgeRef} className="py-2 px-3 w-full max-h-full overflow-auto">
          {messages.map((message,i)=>{
            
            if(message.sender?._id === user?._id){
              if(messages[i]?.sender?._id == messages[i+1]?.sender?._id){
                return <MessageByAuth key={message._id} message={message} showpic={false} />
              }else{
                return <MessageByAuth key={message._id} message={message} showpic={true} />
              }
               
            }else{
              if(messages[i]?.sender?._id == messages[i+1]?.sender?._id){
                return <MessageByOther key={message._id} message={message} showpic={false} />
              }else{
                return <MessageByOther key={message._id} message={message} showpic={true} />
              }
              
            }
          })}
        </div>
        <ChatInput chatId={selectChat?._id} socket={socket} setMessages={setMessages} messages={messages} />
      </div>
    </motion.div>
  );
}

export default Chat;
