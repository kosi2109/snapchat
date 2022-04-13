import React from 'react'
import { IoArrowBackOutline } from 'react-icons/io5'
import { Link } from 'react-router-dom'
import { ChatState } from '../Context/ChatProvider'
import Header from './Header'

function ChatHeader({title}) {
  const {selectChat,user:{_id}} = ChatState()
  const user = selectChat?.users?.filter(u=> u._id !== _id)[0]
  return (
    <Header>
        <Link to='/'>
            <IoArrowBackOutline className='text-primary' size={30}/>
        </Link>
        <h5 className='text-xl font-medium'>
            {title && title}
            {selectChat?.isGroupChat ? selectChat?.chatName : user?.fullName}
        </h5>
        <div className='w-8 h-8 rounded-full overflow-hidden'>
            {user?.pic && <img src={user?.pic} alt="profile" className='w-full h-full' />}
        </div>
    </Header>
  )
}

export default ChatHeader