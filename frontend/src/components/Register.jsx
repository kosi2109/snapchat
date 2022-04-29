import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { register } from "../action/authAction";
import ReactLoading from 'react-loading';

function Register({ setLogin }) {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    password2: "",
  });
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {loading} = useSelector(state=> state.auth)

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(register(form,navigate))
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <h5 className="text-2xl text-primary font-medium mb-12">Register</h5>
      <form onSubmit={handleSubmit} className="flex flex-col">
        <label htmlFor="name">Full Name</label>
        <input
          id="name"
          type="text"
          name="fullName"
          value={form.fullName}
          onChange={handleChange}
          className="border border-primary outline-none p-2 w-full h-11 rounded-md mb-4"
        />
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="text"
          name="email"
          value={form.email}
          onChange={handleChange}
          className="border border-primary outline-none p-2 w-full h-11 rounded-md mb-4"
        />
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          className="border border-primary outline-none p-2 w-full h-11 rounded-md mb-4"
        />

        <label htmlFor="password2">Comfirm Password</label>
        <input
          id="password2"
          type="password"
          name="password2"
          value={form.password2}
          onChange={handleChange}
          className="border border-primary outline-none p-2 w-full h-11 rounded-md mb-4"
        />
        <button className="bg-primary my-3 p-2 h-12 text-bgPrimary font-medium text-lg rounded-xl">
        {loading ? <ReactLoading type='spin' color='white' width={20} height={20} className="mx-auto" /> : "Register" }
        </button>
      </form>
      <p onClick={() => setLogin(true)} className="mt-3 select-none cursor-pointer">
        Already have an account ? SignIn
      </p>
    </>
  );
}

export default Register;
