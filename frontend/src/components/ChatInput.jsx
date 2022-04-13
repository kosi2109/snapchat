import React, { useState } from 'react'
import { BsFillEmojiLaughingFill } from 'react-icons/bs'
import { FiSend } from 'react-icons/fi'
import axios from 'axios'



function ChatInput({chatId,socket,messages,setMessages}) {
    const [message, setMessage] = useState('')
    const {token} = JSON.parse(localStorage.getItem('profile'))
 
    const config = {
      headers: {'Authorization': `Bearer ${token}`}
    }

    const sendMessage = ()=>{
      axios.post('http://localhost:5000/api/message',{content:message,chatId:chatId},config)
      .then((res)=> {
        socket.emit("new message",res.data)
        setMessages([...messages, res.data]);
        setMessage("")
      })
      .catch((error)=> console.log(error))
    }


    const handleSubmit =(e)=>{
        e.preventDefault()
        sendMessage()
    }
  return (
    <div className='fixed bottom-0 p-3 w-full' >
        <form onSubmit={handleSubmit} className='bg-bgSecondary h-12 rounded-lg flex justify-between px-3 items-center'>
          <button className='flex justify-center items-center mx-1'>
          <BsFillEmojiLaughingFill className='text-primary' size={25} />
          </button>
          <input value={message} onChange={(e)=> setMessage(e.target.value)} type="text" className='w-5/6 outline-none border-none p-1 bg-bgSecondary' placeholder='Tap to Type' />
          <button className='flex justify-center items-center mx-1'>
            <FiSend className='text-primary' size={25}/>
          </button>
        </form>
      </div>
  )
}

export default ChatInput