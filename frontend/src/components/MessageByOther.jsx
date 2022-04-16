import React from "react";

function MessageByOther({message,showpic}) {
  return (
    <div className="w-full flex mb-1 pr-3">
      <div className="flex items-end justify-center">
        <div className="w-7 h-auto rounded-full overflow-hidden">
          {showpic && <img src={message.sender.pic} alt="profile" className="w-full h-full" />}
          
        </div>
      </div>
      <div className="flex justify-start px-2">
        <p style={{display:'inline-block'}} className="text-left text-bgPrimary font-medium p-3 bg-primary rounded-r-xl rounded-tl-xl">
          {message?.content}
        </p>
      </div>
    </div>
  );
}

export default MessageByOther;
