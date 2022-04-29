import React from "react";
import { useSelector } from "react-redux";

function MessageByAuth({ message, showpic }) {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="w-full flex mb-1 pl-3 justify-end">
      <div className="flex justify-end px-2">
        <p
          style={{ display: "inline-block" }}
          className="text-right p-3 text-textPrimary font-medium bg-bgSecondary rounded-l-xl rounded-tr-xl"
        >
          {message?.content}
        </p>
      </div>
      <div className="flex items-end justify-center">
        <div className="w-7 h-7 rounded-full overflow-hidden">
          {showpic && (
            <img src={user.pic} alt="profile" className="w-full h-full" />
          )}
        </div>
      </div>
    </div>
  );
}

export default MessageByAuth;
