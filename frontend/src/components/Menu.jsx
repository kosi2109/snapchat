import React, { useEffect, useRef, useState } from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { MdModeEditOutline } from "react-icons/md";
import axios from "axios";
import ReactLoading from "react-loading";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile } from "../action/authAction";

export default function Menu({ openMenu, setOpenMenu }) {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const menuRef = useRef();
  const [imageUpload, setImageUpload] = useState(false);
  const dispatch = useDispatch();

  const uploadImage = (e) => {
    setImageUpload(true);
    const data = new FormData();
    data.append("file", e.target.files[0]);
    data.append("upload_preset", "kosi_chatapp");
    data.append("cloud_name", "kosi1999");
    axios
      .post("https://api.cloudinary.com/v1_1/kosi1999/image/upload", data)
      .then(({ data }) => {
        setImageUpload(false);
        dispatch(updateProfile(data.url));
      })
      .catch((err) => console.log(err));
  };

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

  useOutsideAlerter(menuRef, setOpenMenu);

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
      <button className="text-primary absolute right-5 top-5">
        <AiFillCloseCircle size={30} onClick={() => setOpenMenu(false)} />
      </button>
      <div className="w-full flex flex-col items-center">
        <div className="w-24 h-24 my-2 relative rounded-full border-2 border-primary p-2 flex items-center justify-center">
          <label
            htmlFor="profile"
            className="w-24 h-24 flex items-center justify-center block"
          >
            {imageUpload ? (
              <ReactLoading type="spin" color="red" width={20} />
            ) : (
              <img
                src={user?.pic}
                className="w-20 h-20 rounded-full z-1"
                alt="profile"
              />
            )}
          </label>
          <div className="absolute top-1 right-1 z-20">
            <MdModeEditOutline />
          </div>
          <input
            type="file"
            id="profile"
            className="hidden"
            accept=".png, .jpg, .jpeg"
            onChange={uploadImage}
          />
        </div>
        <h5 className="text-xl font-medium">{user?.fullName}</h5>
        <h5 className="text-lg text-primary">{user?.email}</h5>
      </div>

      <button
        className="w-full text-bgPrimary font-medium py-3 text-lg bg-primary rounded-md"
        onClick={logout}
      >
        Logout
      </button>
    </div>
  );
}
