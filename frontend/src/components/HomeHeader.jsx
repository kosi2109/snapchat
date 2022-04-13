import React from 'react'
import {BiMenuAltLeft , BiSearch} from "react-icons/bi"
import { ChatState } from '../Context/ChatProvider'
import Header from './Header'

function HomeHeader({setSearchOpen}) {
  const {setOpenMenu} = ChatState()
  return (
    <Header>
        <button>
            <BiMenuAltLeft onClick={()=>setOpenMenu(true)} className='text-primary' size={30}/>
        </button>
        <h5 className='text-xl font-medium'>
            SnapChat
        </h5>
        <button>
            <BiSearch onClick={()=>setSearchOpen(true)} className='text-primary' size={30}/>
        </button>
    </Header>
  )
}

export default HomeHeader