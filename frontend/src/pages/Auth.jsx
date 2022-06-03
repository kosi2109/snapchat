import React, { useEffect, useState } from 'react'
import { BsChatFill } from 'react-icons/bs'
import Login from '../components/Login'
import Register from '../components/Register'
import { ToastContainer, toast } from "react-toastify";
import { useDispatch, useSelector } from 'react-redux'
import { CLEAR_ERR } from '../constants/authConstant'

function Auth() {
    const [login, setLogin] = useState(true)
    const {error} = useSelector((state)=> state.auth)
    const dispatch = useDispatch()

    const showToast = (error) => {
        toast(
          <h6 className='text-primary'>{error}</h6>
            ,
          {
            position: "top-center",
            autoClose: 1500,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          }
        );
      };
      useEffect(()=>{
        if(error){
          showToast(error);
          dispatch({type:CLEAR_ERR})
        }
      },[error])

  return (
    <div className='w-full h-full bg-primary'>
        <ToastContainer
        position="top-center"
        autoClose={1000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover
      />
        <div className='flex items-center overflow-hidden justify-center h-1/6 bg-primary'>
            <div className='bg-primary p-2 h-full flex flex-col items-center justify-center'>
                <BsChatFill size={35} color='white' />
                <h5 className='text-bgPrimary font-bold text-3xl'>Snap Chat</h5>
            </div>
        </div>
        <div className='h-5/6 overflow-y-auto bg-bgPrimary w-full flex flex-col py-16 justify-start items-center' style={{borderRadius:"120px 0 0 0"}}>
            {login ? <Login setLogin={setLogin}/> : <Register setLogin={setLogin}/> }
        </div>
    </div>
  )
}

export default Auth
