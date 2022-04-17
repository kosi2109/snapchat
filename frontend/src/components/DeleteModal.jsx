import React from "react";
import { useNavigate } from "react-router-dom";
import { deleteChatAPI } from "../api";
import { ChatState } from "../Context/ChatProvider";
import Modal from "./Modal";

function DeleteModal({ setOpenDeleteModal }) {
  const navigate = useNavigate();
  const { selectChat, setSelectChat, user, setMessages } = ChatState();
  
  const deleteChat = () => {
    if (selectChat) {
      deleteChatAPI({ chatId: selectChat._id })
        .then((res) => {
          if (res.data.success) {
            setMessages([]);
            setSelectChat(null);
            navigate("/", { replace: true });
          }
        })
        .catch((error) => console.log(error));
    }
  };
  return (
    <Modal>
      <div className="relative px-4 w-full max-w-2xl h-full md:h-auto">
        <div className="relative bg-white border drop-shadow rounded-lg dark:bg-gray-700">
          <div className="flex justify-between items-start p-5 rounded-t border-b dark:border-gray-600">
            <h3 className="text-xl lg:text-2xl">Delete Comfirm</h3>
            <button
              onClick={() => setOpenDeleteModal(false)}
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
            <h5 className="text-2xl mb-3">Are You Sure to Delete ?</h5>
            <button
              onClick={deleteChat}
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

export default DeleteModal;
