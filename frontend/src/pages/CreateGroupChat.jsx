import React, { useEffect, useRef, useState } from "react";
import ChatHeader from "../components/ChatHeader";
import { motion } from "framer-motion";
import { ChatState } from "../Context/ChatProvider";
import SearchResult from "../components/SearchResult";
import { useNavigate } from "react-router-dom";
import { useGetLocalStorage } from "../utils/CustomHook";
import { createGroupAPI, userSearchAPI } from "../api";
import Loading from "../components/Loading";
import ReactLoading from "react-loading";

function CreateGroupChat() {
  const [keyword, setKeyword] = useState("");
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const user = useGetLocalStorage();
  const navigate = useNavigate();
  const { setSelectChat, loading, setLoading } = ChatState();
  const gpNameRef = useRef();
  const [searchLoading, setSearchLoading] = useState(false);

  const handleSubmit = (e) => {
    setLoading(true);
    e.preventDefault();
    createGroupAPI({
      gpName: gpNameRef.current.value,
      users: selectedUsers.map((u) => u._id),
    })
      .then((res) => {
        setSelectChat(res.data);
        setLoading(true);
        navigate(`/${res.data._id}`, { replace: true });
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    if (keyword !== "") {
      setSearchLoading(true);
      setTimeout(() => {
        userSearchAPI(keyword)
          .then((res) => {
            setUsers(res.data);
            setSearchLoading(false);
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
      <ChatHeader title="Create Group Chat"  />
      {loading && <Loading />}
      <div className="px-2 h-full md:w-1/2 md:mx-auto">
        <form onSubmit={handleSubmit}>
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
              key={user._id}
              onClick={() => removeUser(user._id)}
              className="bg-primary text-bgPrimary font-medium rounded-full inline-block py-1 px-3 mx-1"
            >
              {user.fullName}
            </div>
          ))}
        </div>
        <div className="h-3/6 overflow-y-auto flex flex-col items-center">
          {searchLoading ? (
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
