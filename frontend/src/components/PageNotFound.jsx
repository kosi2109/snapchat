import React from 'react'
import {motion} from "framer-motion"
import ChatHeader from './ChatHeader'
import Gif from "../assets/404.gif"

function PageNotFound() {
  return (
    <motion.div
      className="h-full"
      exit={{ x: "-100%", transition: { ease: "easeIn" } }}
    >
      <ChatHeader uri='/' showSetting={false} />
      <div className="pt-20 h-full md:w-3/6 md:mx-auto flex items-center justify-center">
        <img src={Gif} alt="page not found" className='w-1/2 h-auto' />
      </div>
    </motion.div>
  )
}

export default PageNotFound