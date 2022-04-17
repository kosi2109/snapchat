import React, { useRef } from "react";
import { changeGroupNameAPI } from "../api";
import { ChatState } from "../Context/ChatProvider";
import Modal from "./Modal";

function GroupNameModal({ setOpenChangeModal }) {
  const gpNameRef = useRef();
  const { selectChat, setSelectChat, user } = ChatState();

  const changeGroupName = () => {
    if (selectChat) {
      changeGroupNameAPI({
        chatId: selectChat._id,
        name: gpNameRef.current.value,
      })
        .then((res) => {
          setSelectChat(res.data);
          setOpenChangeModal(false);
          gpNameRef.current.value = "";
        })
        .catch((error) => console.log(error));
    }
  };
  return (
    <Modal>
      <div className="relative px-4 w-full max-w-2xl h-full md:h-auto">
        <div className="relative bg-white border drop-shadow rounded-lg dark:bg-gray-700">
          <div className="flex justify-between items-start p-5 rounded-t border-b dark:border-gray-600">
            <h3 className="text-xl lg:text-2xl">Add User to Group</h3>
            <button
              onClick={() => setOpenChangeModal(false)}
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
          <div className="p-3 flex flex-col items-center">
            <input
              ref={gpNameRef}
              className="p-1 outline-none border border-none h-12 mb-3 w-full p-2"
              placeholder="Enter Group Name"
              type="text"
              autoComplete="off"
              autoFocus
            />
            <button
              onClick={changeGroupName}
              className="w-5/6 text-bgPrimary font-medium py-2 text-lg bg-primary rounded-md"
            >
              Comfirm
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default GroupNameModal;
