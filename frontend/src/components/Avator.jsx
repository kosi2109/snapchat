import React from "react";
import { useSelector } from "react-redux";

function Avator({ chat, img, id, isSetting = false }) {
  const { activeUsers } = useSelector((state) => state.auth);

  return (
    <div
      className={
        isSetting
          ? "w-20 h-20 relative flex justify-center items center rounded-full"
          : "w-16 h-16 relative flex justify-center items center rounded-full"
      }
    >
      {chat?.isGroupChat ? (
        <div className="w-full h-auto p-1 overflow-hidden relative border-2 border-primary rounded-full">
          {chat?.users.slice(0, 2).map((u, i) => (
            <div key={i}>
              {i == 0 ? (
                <img
                  className="w-8 h-8 rounded-full absolute right-2 top-2"
                  src={u.pic}
                  alt="profile"
                />
              ) : (
                <img
                  className="w-8 h-8 rounded-full absolute left-2 bottom-2"
                  src={u.pic}
                  alt="profile"
                />
              )}
            </div>
          ))}
        </div>
      ) : (
        <>
          <img className="w-full h-auto rounded-full" src={img} alt="profile" />
          {activeUsers.some((u) => u.userId == id) && (
            <div
              className="w-5 h-5 bg-bgPrimary absolute flex justify-center items-center rounded-full"
              style={{ top: "1%", right: "1%" }}
            >
              <div className="w-3 h-3 bg-online rounded-full"></div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Avator;
