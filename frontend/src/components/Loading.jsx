import React from 'react'
import ReactLoading from 'react-loading';

function Loading() {
  return (
    <div className='fixed top-0 bg-bgPrimary h-screen w-full flex justify-center items-center z-10'>
        <ReactLoading type='spin' color='red' width={40} />
    </div>
  )
}

export default Loading