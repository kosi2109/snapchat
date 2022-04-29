import React, { useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import UserList from "./UserList";
import Chat from "./Chat";
import io from "socket.io-client";
import { AnimatePresence } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Menu from "../components/Menu";
import CreateGroupChat from "./CreateGroupChat";
import ChatSetting from "./ChatSetting";
import { useDispatch, useSelector } from "react-redux";
import { receiveMessage, receiveNoti } from "../action/messageAction";
import { setActiveUsers } from "../action/authAction";
import { CLEAR_ERR } from "../constants/authConstant";
import PageNotFound from "../components/PageNotFound";
import { getAllChats } from "../action/chatAction";

const ENDPOINT = "https://realtime-snap.herokuapp.com";
var socket;

function Main() {
  const location = useLocation();
  const [socketConnected, setSocketConnected] = useState(false);
  const [openMenu,setOpenMenu] = useState(false)
  const {user , error} = useSelector(state=> state.auth)
  const {noti } = useSelector(state=> state.messages)
  const {selectChat} = useSelector(state=> state.chats)
  const [typers, setTypers] = useState([])
  const dispatch = useDispatch()

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

  const showError = (error) => {
    toast(
      <>
        <h6 className="text-primary">{error}</h6>
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
      socket.on("online users", (data) => dispatch(setActiveUsers(data)));
    }
  }, [user]);

  useEffect(() => {
    if (socketConnected) {
      socket.removeAllListeners()
      socket.on("online users", (data) => dispatch(setActiveUsers(data)));
      socket.on("delete chat", () => {
        dispatch(getAllChats(false))
        console.log('delete');
      });
      socket.on("message recieved", (messageReceive) => {
        if (messageReceive.sender._id !== user._id){
          if(selectChat || selectChat?._id === messageReceive.chat._id){
            dispatch(receiveMessage(messageReceive))
          }else{
            dispatch(receiveNoti(messageReceive))
            dispatch(getAllChats(false))
          }
        }
      });
    }
  });

  useEffect(() => {
    if (socket) {
      socket.on("start typing", ({chat,sender}) => {
        if(chat._id === selectChat?._id){
          setTypers([...typers,sender])
        }
      });

      socket.on("stop typing", ({chat,sender}) => {
        if(chat._id === selectChat?._id){
          setTypers(typers.filter(typer => typer._id !== sender._id))
        }
      });
    }
  });


  useEffect(()=>{
    if(noti){
      showToast(noti)
      dispatch(getAllChats(false))
    }
  },[noti])


  useEffect(()=>{
    if(error){
      showError(error)
      dispatch({type:CLEAR_ERR})
    }
  },[error])

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
      <Menu openMenu={openMenu} setOpenMenu ={setOpenMenu}/>
        <AnimatePresence exitBeforeEnter>
          <Routes location={location} key={location.key}>
            <Route path="/" element={<UserList setOpenMenu ={setOpenMenu} />} />
            <Route path="/create-group-chat" element={<CreateGroupChat />} />
            <Route path="/:id" element={<Chat typers={typers} socket={socket} />} />
            <Route path="/:id/settings" element={<ChatSetting socket={socket} />} />
            <Route path="/404" element={<PageNotFound />} />
            <Route path="/*" element={<PageNotFound />} />
          </Routes>
        </AnimatePresence>
    </>
  );
}

export default Main;
