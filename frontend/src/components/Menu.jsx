import React, { useEffect, useRef } from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import { Navigate, useNavigate } from "react-router-dom";
import { ChatState } from "../Context/ChatProvider";

export default function Menu() {
  const { openMenu, setOpenMenu, user } = ChatState();
  const navigate = useNavigate();
  const menuRef = useRef();
  const logout = () => {
    localStorage.removeItem("snapchat_profile");
    navigate("/auth", { replace: true });
  };

  function useOutsideAlerter(ref, state) {
    useEffect(() => {
      /**
       * Alert if clicked on outside of element
       */
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          state(false);
        }
      }

      // Bind the event listener
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }

  useOutsideAlerter(menuRef,setOpenMenu)

  return (
    <div
      className={
        openMenu
          ? "bg-bgPrimary flex flex-col justify-between p-3 items-center absolute w-3/4 md:w-1/4 h-screen translate-x-0 shadow duration-700"
          : "bg-bgPrimary flex flex-col justify-between p-3 items-center absolute w-3/4 md:w-1/4 h-screen -translate-x-full duration-700"
      }
      style={{ zIndex: 200 }}
      ref={menuRef}
    >
      <button
        onClick={() => setOpenMenu(false)}
        className="text-primary absolute right-5 top-5"
      >
        <AiFillCloseCircle size={30} />
      </button>
      <div className="w-full flex flex-col items-center">
        <div className="w-24 my-2">
          <img src={user?.pic} className="w-full" alt="" />
        </div>
        <h5 className="text-xl font-medium">{user?.fullName}</h5>
        <h5 className="text-lg text-primary">{user?.email}</h5>
      </div>

      <button
        onClick={logout}
        className="w-full text-bgPrimary font-medium py-3 text-lg bg-primary rounded-md"
      >
        Logout
      </button>
    </div>
  );
}
