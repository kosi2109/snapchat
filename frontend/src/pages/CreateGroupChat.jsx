import React, { useEffect, useRef, useState } from "react";
import ChatHeader from "../components/ChatHeader";
import { motion } from "framer-motion";
import axios from "axios";
import { ChatState } from "../Context/ChatProvider";
import SearchResult from "../components/SearchResult";
import { useNavigate } from "react-router-dom";

function CreateGroupChat() {
  const [keyword, setKeyword] = useState("");
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const { token, _id } = JSON.parse(localStorage.getItem("profile"));
  const navigate = useNavigate();
  const { setSelectChat } = ChatState();
  const gpNameRef = useRef();

  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const handleSubmit = (e) => {
      e.preventDefault();
    axios
      .post(
        `http://localhost:5000/api/chat/group`,
        { gpName: gpNameRef.current.value, users: selectedUsers.map(u=> u._id) },
        config
      )
      .then((res) => {
        setSelectChat(res.data);
        navigate(`/${res.data._id}`, { replace: true });
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    if (keyword !== "") {
      setTimeout(() => {
        axios
          .get(`http://localhost:5000/api/user?search=${keyword}`, config)
          .then((res) => {
            setUsers(res.data);
          })
          .catch((error) => console.log(error));
      }, 1000);
    }
  }, [keyword]);

  const selectUser = (user) => {
    const exist = selectedUsers.some((u) => u._id === user._id);
    if (!exist) {
      setSelectedUsers([...selectedUsers, user]);
    }
  };

  const removeUser = (id) => {
    const users = selectedUsers.filter((u) => u._id !== id);
    setSelectedUsers(users);
  };
  return (
    <motion.div
      className="w-full h-full pt-20 h-screen overflow-y-auto"
      exit={{ x: "100%", transition: { ease: "easeIn" } }}
    >
      <ChatHeader title="Create Group Chat" />
      <div className="px-2 h-full">
        <form onSubmit={handleSubmit} >
          <div className="flex flex-col">
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
          <div className="flex flex-col">
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
          <button className="mb-1 bg-primary rounded-full px-4 text-bgPrimary font-medium text-lg py-1">
            Crate
          </button>
        </form>
        <div className="mb-1">
          {selectedUsers?.length > 0 && (
            <p className="mb-2">Click to remove user</p>
          )}
          {selectedUsers?.map((user) => (
            <div
              onClick={() => removeUser(user._id)}
              className="bg-primary text-bgPrimary font-medium rounded-full inline-block py-1 px-3 mx-1"
            >
              {user.fullName}
            </div>
          ))}
        </div>
        <div className="h-3/6 overflow-y-auto">
          {users?.map((user, i) => (
            <SearchResult
              key={i}
              user={user}
              chat={false}
              selectUser={selectUser}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default CreateGroupChat;
