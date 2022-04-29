import React from "react";
import { IoIosClose } from "react-icons/io";

function SelectedUser({user,removeUser}) {
  return (
    <div
      key={user._id}
      onClick={() => removeUser(user._id)}
      className="bg-primary text-bgPrimary font-medium rounded-full inline-block py-1 px-3 m-1 select-none cursor-pointer"
    >
      {user.fullName} <IoIosClose className="inline m-0 p-0" size={20} />
    </div>
  );
}

export default SelectedUser;
