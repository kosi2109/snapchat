import React from 'react'


function Header({children}) {
  return (
    <div className='z-40 bg-bgPrimary h-16 fixed top-0 flex w-screen px-2 py-4 md:px-4 justify-between items-center border-b border-border'>
        {children}
    </div>
  )
}

export default Header