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
import { getUsersAPI } from '../api'
import Loading from '../components/Loading'


const UserList = () => {
  const [searchOpen, setSearchOpen] = useState(false)
  
  const {user,chats, setChats , loading , setLoading} = ChatState()
  
  const getChats = ()=>{
    setLoading(true)
    if(user){
      getUsersAPI()
      .then((res)=> {
        setChats(res.data);
        setLoading(false)
      })
      .catch((error)=> console.log(error))
    }
  }

  useEffect(()=>{
    getChats()
  },[user])

  return (
    <motion.div exit={{x:"-100%",transition:{ease:"easeIn"}}}>
    <Search searchOpen={searchOpen} setSearchOpen={setSearchOpen} />
    <HomeHeader setSearchOpen={setSearchOpen}/>
    {loading && <Loading/>}
    <div className='bg-bg-Primary flex flex-col h-screen w-screen justify-start items-center overflow-y-auto pt-16'>
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