import React, { useEffect, useState } from "react";
import ChatHeader from "../components/ChatHeader";
import { motion } from "framer-motion";
import SearchResult from "../components/SearchResult";
import { useParams } from "react-router-dom";
import AddUserModal from "../components/AddUserModal";
import GroupNameModal from "../components/GroupNameModal";
import DeleteModal from "../components/DeleteModal";
import RemoveUserModal from "../components/RemoveUserModal";
import Loading from "../components/Loading";
import { getSingleChat } from "../action/chatAction";
import { useDispatch, useSelector } from "react-redux";
import Avator from "../components/Avator";

function ChatSetting({socket}) {
  const { id } = useParams();
  const {user} = useSelector(state=> state.auth)
  const {loading , selectChat} = useSelector(state=> state.chats)
  const profile = selectChat?.users?.filter((u) => u._id !== user._id)[0];
  const [addUserOpen, setAddUserOpen] = useState(false);
  const [openChangeModal, setOpenChangeModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openRemoveModal, setOpenRemoveModal] = useState(false);
  const [selectUser, setSelectUser] = useState(null)
  const dispatch = useDispatch()
  useEffect(() => {
    if (!selectChat) {
      dispatch(getSingleChat(id))
    }
  }, []);

  return (
    <motion.div
      className="h-full"
      exit={{ x: "-100%", transition: { ease: "easeIn" } }}
    >
      <ChatHeader showSetting={false} />
      {loading && <Loading/>}
      <div className="pt-20 h-full md:w-3/6 md:mx-auto">
        <div className="w-full flex items-center justify-center">
          <Avator chat={selectChat} img={profile?.pic} isSetting={true}  />
        </div>
        <button
          onClick={() => setOpenDeleteModal(true)}
          className="px-4 py-2 text-lg w-full text-left text-primary"
        >
          Delete Chat
        </button>
        {openDeleteModal && (
          <DeleteModal socket={socket} setOpenDeleteModal={setOpenDeleteModal} />
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
              <div className="h-full overflow-auto pb-10">
                {selectChat?.users?.map((user) => (
                  <SearchResult key={user._id} user={user} removeBtn={true} setSelectUser={setSelectUser} setOpenRemoveModal={setOpenRemoveModal} />
                ))}
              </div>
            </div>
            {addUserOpen && <AddUserModal setAddUserOpen={setAddUserOpen} />}
            {openChangeModal && (
              <GroupNameModal setOpenChangeModal={setOpenChangeModal} />
            )}
            {openRemoveModal && <RemoveUserModal setOpenRemoveModal={setOpenRemoveModal} selectUser={selectUser} />}
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default ChatSetting;
