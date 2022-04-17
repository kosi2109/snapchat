
import React from "react";


function Modal({ children }) {
  
  return (
    <div className="bg-bgPrimary overflow-y-auto overflow-x-hidden fixed right-0 left-0 top-4 z-50 justify-center items-center h-modal md:h-full md:inset-0">
      {children}
    </div>
  );
}

export default Modal;
