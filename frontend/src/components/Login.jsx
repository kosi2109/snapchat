import React, { useRef } from "react";
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'

function Login({setLogin}) {
    const emailRef = useRef()
    const passRef = useRef()
    const navigate = useNavigate()
    
    const handleSubmit= (e)=>{
        e.preventDefault();
        axios.post('http://localhost:5000/api/auth/login',{email:emailRef.current.value,password:passRef.current.value})
        .then((res)=> {
            localStorage.setItem('profile',JSON.stringify(res.data))
            navigate('/',{replace:true})
        })
        .catch((error)=> console.log(error))
    }


  return (
    <>
      <h5 className="text-2xl text-primary font-medium mb-12">Login</h5>
      <form onSubmit={handleSubmit} className="flex flex-col">
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="text"
          name="email"
          ref={emailRef}
          className="border border-primary outline-none p-2 w-full h-11 rounded-md mb-4"
        />
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          name="password"
          ref={passRef}
          className="border border-primary outline-none p-2 w-full h-11 rounded-md mb-4"
        />
        <button className="bg-primary my-3 p-2 text-bgPrimary font-medium text-lg rounded-xl">
          Login
        </button>
      </form>
      <p onClick={()=>setLogin(false)} className="mt-3">
        Don't have any account ? SignUp
      </p>
    </>
  );
}

export default Login;
