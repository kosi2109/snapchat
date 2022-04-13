import React, { useState } from 'react'
import { BsChatFill } from 'react-icons/bs'
import Login from '../components/Login'
import Register from '../components/Register'

function Auth() {
    const [login, setLogin] = useState(true)
    
  return (
    <div className='w-full h-full bg-primary'>
        <div className='bg-black flex items-center justify-center h-1/6 bg-primary'>
            <div className='bg-primary p-2 flex flex-col items-center justify-center'>
                <BsChatFill size={35} color='white' />
                <h5 className='text-bgPrimary font-bold text-3xl'>Snap Chat</h5>
            </div>
        </div>
        <div className='h-5/6 overflow-y-auto bg-bgPrimary w-full flex flex-col py-16 justify-start items-center' style={{borderRadius:"150px 0 0 0"}}>
            {login ? <Login setLogin={setLogin}/> : <Register setLogin={setLogin}/> }
        </div>
    </div>
  )
}

export default Auth