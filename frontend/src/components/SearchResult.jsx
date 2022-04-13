import axios from 'axios';
import React from 'react'
import { AiFillMessage } from 'react-icons/ai'
import { IoMdAddCircle } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import { ChatState } from '../Context/ChatProvider';

function SearchResult({user,chat=true,selectUser}) {
  const { token, _id } = JSON.parse(localStorage.getItem("profile"));
  const navigate = useNavigate()
  const {setSelectChat} = ChatState()
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const chatHandle = ()=>{
    axios
    .post(`http://localhost:5000/api/chat`,{userId:user._id} ,config)
    .then((res) => {
      setSelectChat(res.data)
      navigate(`/${res.data._id}`,{replace:true})
    })
    .catch((error) => console.log(error));
  }
  
  return (
    <div className='flex justify-between items-center p-3 border-b border-border'>
        <div className='flex items-center'>
            <div className='w-10 h-10 rounded-full bg-primary'></div>
            <div className='flex flex-col px-2'>
              <h4 className='text-lg'>{user.fullName}</h4>
              <h4 className='text-md'>{user.email}</h4>
            </div>
        </div>
        
        {chat ? 
          <button onClick={chatHandle}><AiFillMessage className='text-primary' size={25}/></button>
        : 
          <button onClick={()=>selectUser(user)}><IoMdAddCircle className='text-primary' size={25}/></button>
        }
    </div>
  )
}

export default SearchResult