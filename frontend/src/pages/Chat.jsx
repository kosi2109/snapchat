import React, { useEffect, useRef, useState } from "react";
import ChatHeader from "../components/ChatHeader";
import { motion } from "framer-motion";
import ChatInput from "../components/ChatInput";
import MessageByAuth from "../components/MessageByAuth";
import MessageByOther from "../components/MessageByOther";
import { useNavigate, useParams } from "react-router-dom";
import { getMessages } from "../action/messageAction";
import Loading from "../components/Loading";
import { useDispatch, useSelector } from "react-redux";
import { getSingleChat } from "../action/chatAction";
import lottie from "lottie-web";
import loadingSVG from "../assets/loading.json";

function Chat({ typers, socket }) {
  const { id } = useParams();
  const navigate = useNavigate()
  const messgeRef = useRef();
  const dispatch = useDispatch();
  const { messages, loading } = useSelector((state) => state.messages);
  const { selectChat } = useSelector((state) => state.chats);
  const { user } = useSelector((state) => state.auth);
  const [typing, setTyping] = useState(false)
  useEffect(() => {
    if (!selectChat) {
      dispatch(getSingleChat(id,navigate));
    }
  }, []);

  useEffect(() => {
    if (selectChat && user && socket) {
      dispatch(getMessages(id));
      socket.emit("join chat", selectChat._id);
    }
  }, [selectChat]);

  useEffect(() => {
    if (messgeRef) {
      messgeRef.current.scrollTop = messgeRef.current.scrollHeight;
    }
  }, [messgeRef, messages,typers]);

  useEffect(() => {
    if(typers.length > 0 && !typing){
      setTyping(true)
      lottie.loadAnimation({
        container: document.querySelector("#react-logo"),
        animationData: loadingSVG,
        loop: true,
        autoplay: true,
      });
    }
    return setTyping(false)
  }, [typers]);

  return (
    <motion.div
      className="w-full h-full backdrop-blur-sm"
      exit={{ x: "-100%", transition: { ease: "easeIn" } }}
    >
      <ChatHeader uri='/' />
      {(loading || !selectChat) && <Loading />}
      <div className="w-full h-full ">
        <div
          ref={messgeRef}
          className="py-20 px-3 w-full md:w-3/6 md:mx-auto h-full bg-bgPrimary overflow-auto relative"
        >
          {messages.map((message, i) => {
            if (message.sender?._id === user?._id) {
              if (messages[i]?.sender?._id === messages[i + 1]?.sender?._id) {
                return (
                  <MessageByAuth
                    key={message._id}
                    message={message}
                    showpic={false}
                  />
                );
              } else {
                return (
                  <MessageByAuth
                    key={message._id}
                    message={message}
                    showpic={true}
                  />
                );
              }
            } else {
              if (messages[i]?.sender?._id === messages[i + 1]?.sender?._id) {
                return (
                  <MessageByOther
                    key={message._id}
                    message={message}
                    showpic={false}
                  />
                );
              } else {
                return (
                  <MessageByOther
                    key={message._id}
                    message={message}
                    showpic={true}
                  />
                );
              }
            }
          })}
          {typers.length > 0 && (
            <div className="w-full h-8 flex items-center justify-start overflow-hidden">
              <div className="flex px-3">
                {typers.map((typer,i)=> (
                  <div key={i} className="w-6 h-6 rounded-full -ml-2 overflow-hidden">
                    <img className="w-full h-full" src={typer.pic} alt="img" />
                  </div>
                  ))}
              </div>
              {typers.length === 1 && 
                <div id="react-logo" className="p-0 m-0 inline" />
               }
            </div>
          )}
        </div>

        <ChatInput socket={socket} />
      </div>
    </motion.div>
  );
}

export default Chat;
