import React, { useEffect, useRef, useState } from "react";
import "./Search.css";
import { IoArrowBackOutline } from "react-icons/io5";
import SearchResult from "./SearchResult";
import ReactLoading from "react-loading";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../action/usersAction";

function Search({ searchOpen, setSearchOpen }) {
  const [keyword, setKeyword] = useState("");
  const { users, loading } = useSelector((state) => state.users);
  const inputRef = useRef();
  const dispatch = useDispatch();
  useEffect(() => {
    if (searchOpen) {
      inputRef.current.focus();
    }
  }, [searchOpen]);

  useEffect(() => {
    if (keyword !== "") {
      const delayFn = setTimeout(() => dispatch(getUsers(keyword)), 1000);
      return () => clearTimeout(delayFn);
    }
  }, [keyword]);

  return (
    <div
      className={
        searchOpen ? "search open bg-bgPrimary w-full md:px-80" : "search bg-bgPrimary w-full md:px-80"
      }
    >
      <div className="px-2 py-3 border-b border-border flex items-center">
        <button className="p-1 text-primary">
          <IoArrowBackOutline size={30} onClick={() => setSearchOpen(false)} />
        </button>
        <input
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          className="p-1 outline-none border-none h-7 w-full"
          type="text"
          autoComplete="off"
          autoFocus
          ref={inputRef}
        />
      </div>
      <div className="flex flex-col items-center">
        {loading && (
          <ReactLoading type="spin" color="red" width={30} className="my-3" />
        )}
        {users?.map((user) => (
          <SearchResult key={user._id} user={user} />
        ))}
      </div>
    </div>
  );
}

export default Search;
