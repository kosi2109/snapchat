import React from 'react'
import {BiMenuAltLeft , BiSearch} from "react-icons/bi"
import Header from './Header'

function HomeHeader({setSearchOpen,setOpenMenu}) {

  return (
    <Header className="md:hidden">
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