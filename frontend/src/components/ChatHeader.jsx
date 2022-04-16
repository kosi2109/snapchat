import React from "react";
import { AiFillInfoCircle } from "react-icons/ai";
import { IoArrowBackOutline } from "react-icons/io5";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { ChatState } from "../Context/ChatProvider";
import ChatSetting from "../pages/ChatSetting";
import Header from "./Header";

function ChatHeader({ title, showSetting = true }) {
  const { selectChat } = ChatState();
  const { _id } = JSON.parse(localStorage.getItem("profile"));
  const user = selectChat?.users?.filter((u) => u._id !== _id)[0];
  const navigate = useNavigate();
  return (
    <Header>
      <div onClick={()=> navigate(-1)}>
        <IoArrowBackOutline className="text-primary" size={30} />
      </div>
      <h5 className="text-xl font-medium">
        {showSetting ? 
          <>
            {title && title}
            {selectChat?.isGroupChat ? selectChat?.chatName : user?.fullName}
          </>
        :
          ""
        }
        
      </h5>
      {showSetting ? (
        <div
          className="w-8 h-8 rounded-full overflow-hidden"
          onClick={() => navigate(`/${selectChat._id}/settings`)}
        >
          {selectChat?.isGroupChat ? (
            <AiFillInfoCircle className="w-full h-full text-primary" />
          ) : (
            <>
              {user?.pic && (
                <img src={user?.pic} alt="profile" className="w-full h-full" />
              )}
            </>
          )}
        </div>
      ) : (
        <div  className="w-8 h-8"></div>
      )}
    </Header>
  );
}

export default ChatHeader;
