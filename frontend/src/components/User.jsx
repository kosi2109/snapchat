import React from "react";
import { Link } from "react-router-dom";
import { ChatState } from "../Context/ChatProvider";

function User({ chat }) {
  const {
    setSelectChat,
    user: { _id },
    activeUsers,
  } = ChatState();
  const user = chat.users.filter((user) => user._id !== _id)[0];
  const latestMessage = chat.latestMessage;

  return (
    <Link
      className="w-full"
      to={`/${chat._id}`}
      onClick={() => setSelectChat(chat)}
    >
      <div className="flex justify-start items-start p-2 border-b border-border relative w-full h-24 md:h-auto overflow-hidden">
        <div className="w-16 h-16 relative flex justify-center items center rounded-full">
          {chat.isGroupChat ? (
            <div className="w-full h-auto p-1 overflow-hidden relative border-2 border-primary rounded-full">
              {chat.users.slice(0, 2).map((u, i) => (
                <>
                  {i == 0 ? (
                    <img
                      key={i}
                      className="w-8 h-8 rounded-full absolute right-2 top-2"
                      src={u.pic}
                      alt="profile"
                    />
                  ) : (
                    <img
                      key={i}
                      className="w-8 h-8 rounded-full absolute left-2 bottom-2"
                      src={u.pic}
                      alt="profile"
                    />
                  )}
                </>
              ))}
            </div>
          ) : (
            <>
              <img
                className="w-full h-auto rounded-full"
                src={user.pic}
                alt="profile"
              />
              {activeUsers.some((u) => u.userId == user?._id) && (
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
        <div className="p-1">
          <div>
            <h5 className="text-lg font-medium">
              {chat.isGroupChat ? chat?.chatName : user?.fullName}
            </h5>
          </div>
          <div className="w-full whitespace-normal h-12 overflow-hidden">
            <p>{latestMessage?.content && latestMessage?.content}</p>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default User;
