import axios from "axios";
import React, { useEffect, useState } from "react";
import { ChatState } from "../Context/ChatProvider";
import SearchResult from "./SearchResult";

function Modal({ modalOpen, setModalOpen }) {
  const [keyword, setKeyword] = useState("");
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const { token, _id } = JSON.parse(localStorage.getItem("profile"));
  const { selectChat , setSelectChat} = ChatState();
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const addUser = () => {
    axios
      .post(
        `http://localhost:5000/api/chat/add-user`,
        { chatId: selectChat?._id, addUsers: selectedUsers },
        config
      )
      .then((res) => {
        setSelectChat(res.data);
        setSelectedUsers([])
        setModalOpen(false)
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

  useEffect(() => {
    if (!openModal) {
      setSelectedUsers([]);
    }
  }, [modalOpen]);

  const openModal =
    "overflow-y-auto overflow-x-hidden fixed right-0 left-0 top-4 z-50 justify-center items-center h-modal md:h-full md:inset-0";
  const closeModal =
    "hidden overflow-y-auto overflow-x-hidden fixed right-0 left-0 top-4 z-50 justify-center items-center h-modal md:h-full md:inset-0";

  return (
    <div className={modalOpen ? openModal : closeModal}>
      <div className="relative px-4 w-full max-w-2xl h-full md:h-auto">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <div className="flex justify-between items-start p-5 rounded-t border-b dark:border-gray-600">
            <h3 className="text-xl font-semibold text-gray-900 lg:text-2xl dark:text-white">
              Add User to Group
            </h3>
            <button
              onClick={() => setModalOpen(false)}
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
              data-modal-toggle="default-modal"
            >
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
          </div>

          <div className="py-4 px-2 space-y-6">
            <div className="flex flex-col">
              <input
                id="search"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                className="p-2 w-full h-11 rounded-md mb-4 focus:border-none focus:outline-none"
                type="text"
                autoComplete="off"
              />
            </div>

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

          <div className="flex items-center p-6 space-x-2 rounded-b border-t border-gray-200 dark:border-gray-600">
            <button
              onClick={addUser}
              type="button"
              className="text-white bg-primary hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Add
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
