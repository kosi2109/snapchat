import React, { useEffect, useState } from 'react'
import HomeHeader from '../components/HomeHeader'
import Search from '../components/Search'
import User from '../components/User'
import {motion} from "framer-motion"
import {IoMdAdd} from "react-icons/io"
import { BsFillPeopleFill } from 'react-icons/bs'
import { Link } from 'react-router-dom'
import Loading from '../components/Loading'
import { useDispatch, useSelector } from 'react-redux'
import { getAllChats } from '../action/chatAction'


const UserList = ({setOpenMenu}) => {
  const [searchOpen, setSearchOpen] = useState(false)
  const {chats,loading} = useSelector(state=> state.chats)
  const dispatch = useDispatch()
  

  useEffect(()=>{
    dispatch(getAllChats())
  },[])

  return (
    <motion.div className='relative w-full' exit={{x:"-100%",transition:{ease:"easeIn"}}}>
    <Search searchOpen={searchOpen} setSearchOpen={setSearchOpen} />
    <HomeHeader setOpenMenu={setOpenMenu} setSearchOpen={setSearchOpen}/>
    {loading && <Loading/>}
    <div className='bg-bg-Primary flex flex-col h-screen w-full md:w-3/6 md:mx-auto justify-start items-center overflow-y-auto pt-16'>
      {chats.map(chat =>(
        <User key={chat._id} chat={chat}/>
      ))}
    </div>
    <Link to="/create-group-chat" className='shadow fixed items-center text-bgPrimary bottom-3 left-2 md:left-80 rounded-full p-2 bg-primary flex w-12 h-12'>
      <IoMdAdd style={{marginRight:'-5px'}}/> <BsFillPeopleFill size={20}/>
    </Link>
    </motion.div>
  )
}

export default UserList