
import React from "react";


function Modal({ children }) {
  
  return (
    <div style={{backgroundColor:"rgba(0,0,0,0.3)"}} className="overflow-y-auto overflow-x-hidden fixed right-0 left-0 top-4 z-30 flex p-2 justify-center items-center h-screen w-screen md:inset-0">
      {children}
    </div>
  );
}

export default Modal;
