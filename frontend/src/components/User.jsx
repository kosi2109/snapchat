import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectChat } from "../action/chatAction";
import Avator from "./Avator";

function User({ chat }) {
  const {
    user: { _id },
  } = useSelector((state) => state.auth);
  const user = chat.users.filter((user) => user._id !== _id)[0];
  const latestMessage = chat.latestMessage;
  const dispatch = useDispatch();

  return (
    <Link
      className="w-full"
      to={`/${chat._id}`}
      onClick={() => dispatch(selectChat(chat))}
    >
      <div className="flex justify-start items-start p-2 border-b border-border relative w-full h-24 md:h-auto overflow-hidden">
        <Avator chat={chat} img={user?.pic} id={user._id} />
        <div className="p-1">
          <div>
            <h5 className="text-lg font-medium">
              {chat.isGroupChat ? chat?.chatName : user?.fullName}
            </h5>
          </div>
          <div className="w-full whitespace-normal h-12 overflow-hidden">
            <p>{latestMessage?.content && latestMessage?.content}</p>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default User;
