import React, { useEffect, useState } from "react";
import { Link, Navigate, Route, Routes, useLocation } from "react-router-dom";
import UserList from "./UserList";
import Chat from "./Chat";
import io from "socket.io-client";
import { ChatState } from "../Context/ChatProvider";
import { AnimatePresence } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Menu from "../components/Menu";
import CreateGroupChat from "./CreateGroupChat";

const ENDPOINT = "http://localhost:5000";
var socket;

function Main() {
  const location = useLocation();
  const {
    user,
    selectChat,
    setMessages,
    messages,
    noti,
    setNoti,
    setActiveUsers,
  } = ChatState();
  const [socketConnected, setSocketConnected] = useState(false);
  

  const showToast = (messageReceive) => {
    toast(
      <>
        <h6>{messageReceive.sender.fullName}</h6>
        <p>{messageReceive.content}</p>
      </>,
      {
        position: "top-center",
        autoClose: 1500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      }
    );
  };

  useEffect(() => {
    if (user) {
      socket = io(ENDPOINT);
      socket.emit("setup", user._id);
      socket.on("connected", () => setSocketConnected(true));
      socket.emit("online", user._id);
    }
  }, [user]);
  
  useEffect(() => {
    if (socketConnected) {
      socket.on("online users", (data) => setActiveUsers(data));
      socket.on("message recieved", (messageReceive) => {
        if(!selectChat || selectChat?._id !== messageReceive.chat._id){
          setNoti([messageReceive, ...noti]);
        }else{
          setMessages([...messages, messageReceive]);
        }
      });
    }
  });

  useEffect(() => {
    if (noti.length > 0) {
      showToast(noti[0]);
      setNoti([])
    }
  }, [noti]);

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={1000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover
      />
      <Menu/>
      <AnimatePresence exitBeforeEnter>
        <Routes location={location} key={location.key}>
          <Route path="/" element={<UserList />} />
          <Route path="/create-group-chat" element={<CreateGroupChat />} />
          <Route path="/:id" element={<Chat socket={socket} />} />
        </Routes>
      </AnimatePresence>
    </>
  );
}

export default Main;
