import Modal from "./Modal";
import React, { useEffect, useState } from "react";
import { ChatState } from "../Context/ChatProvider";
import SearchResult from "./SearchResult";
import { addUserAPI, userSearchAPI } from "../api";
import ReactLoading from "react-loading";

function AddUserModal({ setAddUserOpen }) {
  const [keyword, setKeyword] = useState("");
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const { selectChat, setSelectChat, setLoading } = ChatState();

  const addUser = () => {
    setAddUserOpen(false);
    setLoading(true);
    addUserAPI({ chatId: selectChat?._id, addUsers: selectedUsers })
      .then((res) => {
        setSelectChat(res.data);
        setSelectedUsers([]);
        setLoading(false);
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
    <Modal>
      <div className="bg-bgPrimary relative shadow-md border rounded-md w-full max-w-2xl md:h-auto">
        <div className="relative bg-white dark:bg-gray-700">
          <div className="flex justify-between items-start p-5 rounded-t border-b dark:border-gray-600">
            <h3 className="text-xl lg:text-2xl">Add User to Group</h3>
            <button
              onClick={() => setAddUserOpen(false)}
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

          <div className="py-4 px-3 ">
            <div className="flex flex-col">
              <input
                id="search"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                className="p-2 w-full h-16 rounded-md mb-4 focus:border-none focus:outline-none"
                type="text"
                autoComplete="off"
                placeholder="Name or Email"
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

            <div className="h-3/6 overflow-y-auto flex flex-col items-center">
              {searchLoading ? (
                <ReactLoading
                  type="spin"
                  color="red"
                  width={30}
                  className="my-3"
                />
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

          <div className="flex items-center justify-end py-2 px-3 space-x-2 rounded-b border-t border-gray-200 dark:border-gray-600">
            <button
              onClick={addUser}
              type="button"
              className="text-bgPrimary bg-primary hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Add
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default AddUserModal;
