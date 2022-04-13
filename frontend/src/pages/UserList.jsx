import React, { useEffect, useState } from 'react'
import HomeHeader from '../components/HomeHeader'
import Search from '../components/Search'
import User from '../components/User'
import {motion} from "framer-motion"
import axios from 'axios'
import { ChatState } from '../Context/ChatProvider'
import {IoMdAdd} from "react-icons/io"
import { BsFillPeopleFill } from 'react-icons/bs'
import { Link } from 'react-router-dom'


const UserList = () => {
  const [searchOpen, setSearchOpen] = useState(false)
  const [chats, setChats] = useState([])
  const {user,noti} = ChatState()
 
  const config = {
    headers: {'Authorization': `Bearer ${user?.token}`}
  }

  const getChats = ()=>{
    if(user){
      axios.get('http://localhost:5000/api/chat',config)
      .then((res)=> {
        setChats(res.data);
      })
      .catch((error)=> console.log(error))
    }
  }

  useEffect(()=>{
    getChats()
  },[user,noti])

  return (
    <motion.div exit={{x:"-100%",transition:{ease:"easeIn"}}}>
    <Search searchOpen={searchOpen} setSearchOpen={setSearchOpen} />
    <HomeHeader setSearchOpen={setSearchOpen}/>
    <div className='bg-bg-Primary flex flex-col h-screen w-screen justify-start items-center overflow-y-auto pt-16' style={{zIndex:1}}>
      {chats.map(chat =>(
        <User key={chat._id} chat={chat}/>
      ))}
    </div>
    <Link to="/create-group-chat" className='shadow fixed items-center text-bgPrimary bottom-3 left-2 rounded-full p-2 bg-primary flex w-12 h-12'>
      <IoMdAdd style={{marginRight:'-5px'}}/> <BsFillPeopleFill size={20}/>
    </Link>
    </motion.div>
  )
}

export default UserList