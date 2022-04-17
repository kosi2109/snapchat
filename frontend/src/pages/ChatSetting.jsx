import React, { useEffect, useState } from "react";
import ChatHeader from "../components/ChatHeader";
import { motion } from "framer-motion";
import { ChatState } from "../Context/ChatProvider";
import SearchResult from "../components/SearchResult";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Modal from "../components/Modal";
import AddUserModal from "../components/AddUserModal";
import GroupNameModal from "../components/GroupNameModal";
import DeleteModal from "../components/DeleteModal";
import {useGetLocalStorage} from '../utils/CustomHook'
import { getSingleChat } from "../api";
function ChatSetting() {
  const { id } = useParams();
  const { selectChat, setSelectChat } = ChatState();
  const user = useGetLocalStorage()
  const profile = selectChat?.users?.filter((u) => u._id !== user._id)[0];
  const [addUserOpen, setAddUserOpen] = useState(false);
  const [openChangeModal, setOpenChangeModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
 
  const chat = () => {
    if (user) {
      getSingleChat(id)
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
        <button
          onClick={() => setOpenDeleteModal(true)}
          className="px-4 py-2 text-lg w-full text-left text-primary"
        >
          Delete Chat
        </button>
        {openDeleteModal && (
          <DeleteModal setOpenDeleteModal={setOpenDeleteModal} />
        )}
        {selectChat?.isGroupChat && (
          <div className="flex flex-col items-start w-full p-2 h-full overflow-y-auto">
            <button
              onClick={() => setOpenChangeModal(true)}
              className="p-2 text-lg w-full text-left"
            >
              Change Group Name
            </button>
            <div className="w-full h-3/5 p-2">
              <div className="flex w-full justify-between">
                <h5 className="text-xl">Members</h5>
                <button
                  onClick={() => setAddUserOpen(true)}
                  className="block text-bgPrimary bg-primary focus:outline-none font-medium rounded-lg text-sm px-3 py-2 text-center"
                  type="button"
                >
                  Add User
                </button>
              </div>
              <div className="h-full overflow-auto">
                {selectChat?.users?.map((user) => (
                  <SearchResult key={user._id} user={user} removeBtn={true} />
                ))}
              </div>
            </div>
            {addUserOpen && <AddUserModal setAddUserOpen={setAddUserOpen} />}
            {openChangeModal && (
              <GroupNameModal setOpenChangeModal={setOpenChangeModal} />
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default ChatSetting;
