import React, { useEffect, useState } from "react";
import ChatHeader from "../components/ChatHeader";
import { motion } from "framer-motion";
import { ChatState } from "../Context/ChatProvider";
import SearchResult from "../components/SearchResult";
import { useParams } from "react-router-dom";
import axios from "axios";
import Modal from "../components/Modal";

function ChatSetting() {
  const { id } = useParams();
  const { selectChat, setSelectChat, user } = ChatState();
  const { _id } = JSON.parse(localStorage.getItem("profile"));
  const profile = selectChat?.users?.filter((u) => u._id !== _id)[0];
  const [modalOpen, setModalOpen] = useState(false)

  const config = {
    headers: { Authorization: `Bearer ${user?.token}` },
  };

  const chat = () => {
    if (user) {
      axios
        .get(`http://localhost:5000/api/chat/${id}`, config)
        .then((res) => {
          setSelectChat(res.data);
        })
        .catch((error) => console.log(error));
    }
  };

  useEffect(() => {
    if (!selectChat) {
      chat();
    }
  }, [user]);
  
  return (
    <motion.div
      className="h-full"
      exit={{ x: "-100%", transition: { ease: "easeIn" } }}
    >
      <ChatHeader showSetting={false} />
      <div className="pt-20 h-full">
        <div className="w-full flex flex-col items-center justify-center">
          {selectChat?.isGroupChat ? (
            <>
              <img
                src={profile?.pic}
                className="w-28 rounded-full mb-2"
                alt="profile"
              />
              <h5 className="text-2xl font-medium">{selectChat?.chatName}</h5>
            </>
          ) : (
            <>
              <img
                src={profile?.pic}
                className="w-28 rounded-full mb-2"
                alt="profile"
              />
              <h5 className="text-2xl font-medium">{profile?.fullName}</h5>
            </>
          )}
        </div>
        {selectChat?.isGroupChat && (
          <div className="flex flex-col items-start w-full p-2 h-full">
            <button className="p-2 text-lg w-full text-left">
              Change Group Name
            </button>
            <div className="w-full h-4/6 p-2">
              <div className="flex w-full justify-between">
                <h5 className="text-xl">Members</h5>
                <button onClick={()=>setModalOpen(true)} className="block text-white bg-primary focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center" type="button">
                Toggle modal
                </button>
              </div>
              <div className="h-full overflow-auto">
                {selectChat?.users?.map((user) => (
                  <SearchResult key={user._id} user={user} removeBtn={true} />
                ))}
              </div>
            </div>
            <Modal modalOpen ={modalOpen} setModalOpen={setModalOpen} />
          </div>
          
        )}
      </div>
    </motion.div>
  );
}

export default ChatSetting;
