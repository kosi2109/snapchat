import React, { useEffect, useState } from "react";
import { AiFillMessage, AiOutlineCloseCircle } from "react-icons/ai";
import { IoMdAddCircle } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { accessChat } from "../action/chatAction";

function SearchResult({
  user,
  chat = true,
  selectUser,
  removeBtn = false,
  setOpenRemoveModal,
  setSelectUser,
}) {
  const { selectChat } = useSelector((state) => state.chats);
  const {
    user: { _id },
  } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const activeUsers = [];
  const [canRemove, setCanRemove] = useState(false);
  const dispatch = useDispatch();
  const chatHandle = () => {
    dispatch(accessChat({ userId: user._id }, navigate));
  };

  useEffect(() => {
    if (selectChat?.isGroupChat && selectChat?.groupAdmin._id === _id) {
      setCanRemove(true);
    } else {
      setCanRemove(false);
    }
  }, [selectChat]);

  return (
    <div className="flex justify-between items-center w-full p-3 border-b border-border drop-shadow-none">
      <div className="flex items-center">
        <div className="w-10 h-10 relative">
          <img
            className="w-full h-full rounded-full"
            src={user?.pic}
            alt="img"
          />
          {activeUsers.some((u) => u.userId === user?._id) && (
            <div
              className="w-3 h-3 bg-bgPrimary absolute flex justify-center items-center rounded-full"
              style={{ top: "1%", right: "1%" }}
            >
              <div className="w-2 h-2 bg-online rounded-full"></div>
            </div>
          )}
        </div>

        <div className="flex flex-col px-2">
          <h4 className="text-lg">{user.fullName}</h4>
          <h4 className="text-md">{user.email}</h4>
        </div>
      </div>

      {removeBtn ? (
        <>
          {canRemove && (
            <button>
              <AiOutlineCloseCircle
                onClick={() => {
                  setOpenRemoveModal(true);
                  setSelectUser(user);
                }}
                className="text-primary"
                size={25}
              />
            </button>
          )}
        </>
      ) : (
        <>
          {chat ? (
            <button onClick={chatHandle}>
              <AiFillMessage className="text-primary" size={25} />
            </button>
          ) : (
            <button onClick={() => selectUser(user)}>
              <IoMdAddCircle className="text-primary" size={25} />
            </button>
          )}
        </>
      )}
    </div>
  );
}

export default SearchResult;
