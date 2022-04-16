import React, { useEffect, useRef, useState } from 'react'
import './Search.css'
import {IoArrowBackOutline} from "react-icons/io5"
import SearchResult from './SearchResult'
import axios from 'axios'

function Search({searchOpen,setSearchOpen}) {
    const [keyword, setKeyword] = useState('')
    const [users, setUsers] = useState([])
    const inputRef = useRef()
    const { token, _id } = JSON.parse(localStorage.getItem("profile"));

    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };


    useEffect(()=>{
      if(searchOpen){
        inputRef.current.focus()
      }
    },[searchOpen])

    const searchReq = ()=>{
        axios
          .get(`http://localhost:5000/api/user?search=${keyword}`, config)
          .then((res) => {
            setUsers(res.data);
          })
          .catch((error) => console.log(error));
    }

    useEffect(()=>{
      if(keyword !== ""){
        const delayFn = setTimeout(() => searchReq(), 1000);
        return () => clearTimeout(delayFn);
      }
    },[keyword])
  return (
    <div className={ searchOpen ? 'search open bg-bgPrimary' : 'search bg-bgPrimary'}>
        <div className='px-2 py-3 border-b border-border flex items-center'>
            <button className='p-1 text-primary'><IoArrowBackOutline size={30} onClick={()=>setSearchOpen(false)} /></button>
            <input value={keyword} onChange={(e)=> setKeyword(e.target.value)} className='p-1 outline-none border-none h-7 w-full' type="text" autoComplete='off' autoFocus ref={inputRef}  />
        </div>
        <div>
          {users?.map(user => (
            <SearchResult key={user._id} user={user}/>
          ))}
        </div>
    </div>
  )
}

export default Search