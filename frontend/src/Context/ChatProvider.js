import React, { createContext, useContext, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

const ChatContext = createContext()

function ChatProvider({children}) {
    const location = useLocation()
    const [user, setUser] = useState(null)
    const [messages, setMessages] = useState([])
    const [activeUsers, setActiveUsers] = useState([])
    const [selectChat,setSelectChat] = useState(null)
    const [openMenu, setOpenMenu] = useState(false);
    const [noti, setNoti] = useState([])
    const [chats, setChats] = useState([])

    useEffect(()=>{
        const userInfo = localStorage.getItem('snapchat_profile')
        if(userInfo){
            setUser(JSON.parse(userInfo))
        }
    },[location])
  return (
    <ChatContext.Provider value={{chats, setChats,openMenu,setOpenMenu,noti,setNoti,setMessages,messages,user,selectChat,setSelectChat,activeUsers,setActiveUsers}}>
        {children}
    </ChatContext.Provider>
  )
}

export const ChatState = ()=>{
    return useContext(ChatContext)
}

export default ChatProvider