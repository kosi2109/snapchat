import React, { useEffect, useRef, useState } from "react";
import ChatHeader from "../components/ChatHeader";
import { motion } from "framer-motion";
import SearchResult from "../components/SearchResult";
import { useNavigate } from "react-router-dom";
import ReactLoading from "react-loading";
import { getUsers } from "../action/usersAction";
import { useDispatch, useSelector } from "react-redux";
import { createGroupChat } from "../action/chatAction";
import SelectedUsers from "../components/SelectedUsers";

function CreateGroupChat() {
  const [keyword, setKeyword] = useState("");
  const {users , loading} = useSelector(state => state.users);
  const chat = useSelector(state => state.chats);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const navigate = useNavigate();
  const gpNameRef = useRef();
  
  const dispatch = useDispatch()

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createGroupChat({
      gpName: gpNameRef.current.value,
      users: selectedUsers.map((u) => u._id),
    },navigate))
    
  };

  useEffect(() => {
    if (keyword !== "") {
      const delayFn = setTimeout(() => dispatch(getUsers(keyword)), 1000);
      return () => clearTimeout(delayFn);
    }
  }, [keyword]);

  const selectUser = (user) => {
    const exist = selectedUsers.some((u) => u._id === user._id);
    if (!exist) {
      setSelectedUsers([...selectedUsers, user]);
    }
  };

  return (
    <motion.div
      className="w-full h-full pt-20 h-screen overflow-y-auto"
      exit={{ x: "100%", transition: { ease: "easeIn" } }}
    >
      <ChatHeader title="Create Group Chat"  />
     
      <div className="px-2 h-full md:w-1/2 md:mx-auto">
        <form onSubmit={handleSubmit} className="flex flex-col items-center">
          <div className="flex flex-col w-full">
            <label htmlFor="gpName" className="mb-2">
              Group Name *
            </label>
            <input
              ref={gpNameRef}
              type="text"
              id="gpName"
              className="border border-primary outline-none p-2 w-full h-11 rounded-md mb-4"
            />
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor="search" className="mb-2">
              Search Users
            </label>
            <input
              id="search"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              className="border border-primary outline-none p-2 w-full h-11 rounded-md mb-4"
              type="text"
              autoComplete="off"
            />
          </div>
          <button className="mb-1 bg-primary w-full rounded-md h-11 px-4 text-bgPrimary font-medium text-lg py-1">
          {chat.loading ? <ReactLoading type='spin' color='white' width={20} height={20} className="mx-auto" /> : "Create" }
          </button>
        </form>
        <SelectedUsers selectedUsers={selectedUsers} setSelectedUsers={setSelectedUsers}/>
        <div className="h-3/6 overflow-y-auto flex flex-col items-center">
          {loading ? (
            <ReactLoading type="spin" color="red" width={30} className="my-3" />
          ) : (
            <>
              {users?.map((user, i) => (
                <SearchResult
                  key={i}
                  user={user}
                  chat={false}
                  selectUser={selectUser}
                />
              ))}
            </>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default CreateGroupChat;
