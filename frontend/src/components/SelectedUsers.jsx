import React from "react";
import SelectedUser from "./SelectedUser";

function SelectedUsers({ selectedUsers, setSelectedUsers }) {
  const removeUser = (id) => {
    const users = selectedUsers.filter((u) => u._id !== id);
    setSelectedUsers(users);
  };
  return (
    <div className="mb-1">
      {selectedUsers?.length > 0 && (
        <p className="mb-2">Click to remove user</p>
      )}
      {selectedUsers?.map((user, i) => (
        <SelectedUser user={user} key={i} removeUser={removeUser} />
      ))}
    </div>
  );
}

export default SelectedUsers;
