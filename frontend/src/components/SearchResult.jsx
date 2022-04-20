import React, { useEffect, useState } from "react";
import { AiFillMessage, AiOutlineCloseCircle } from "react-icons/ai";
import { IoMdAddCircle } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { accessChat, removeUserAPI } from "../api";
import { ChatState } from "../Context/ChatProvider";
import { useGetLocalStorage } from "../utils/CustomHook";

function SearchResult({ user, chat = true, selectUser, removeBtn = false , setOpenRemoveModal , setSelectUser }) {
  const { _id } = useGetLocalStorage()
  const navigate = useNavigate();
  const { setSelectChat , selectChat } = ChatState();
  const [canRemove, setCanRemove] = useState(false)


  const chatHandle = () => {
    accessChat( { userId: user._id })
      .then((res) => {
        setSelectChat(res.data);
        navigate(`/${res.data._id}`, { replace: true });
      })
      .catch((error) => console.log(error));
  };

  


  useEffect(()=>{
    if(selectChat?.isGroupChat && selectChat?.groupAdmin._id === _id){
      setCanRemove(true)
    }else{
      setCanRemove(false)
    }
  },[selectChat])

  return (
    <div className="flex justify-between items-center w-full p-3 border-b border-border drop-shadow-none">
      <div className="flex items-center">
        <img className="w-10 h-10 rounded-full" src={user?.pic} alt="img" />
        
        <div className="flex flex-col px-2">
          <h4 className="text-lg">{user.fullName}</h4>
          <h4 className="text-md">{user.email}</h4>
        </div>
      </div>

      {removeBtn ? (
        <>
        {canRemove &&
        <button>
          <AiOutlineCloseCircle onClick={()=>{setOpenRemoveModal(true);setSelectUser(user)}} className="text-primary" size={25} />
        </button>
         }
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
