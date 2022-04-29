import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../action/authAction";
import ReactLoading from "react-loading";

function Login({ setLogin }) {
  const emailRef = useRef();
  const passRef = useRef();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      login(
        { email: emailRef.current.value, password: passRef.current.value },
        navigate
      )
    );
  };

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
        <button className="bg-primary my-3 p-2 h-12 text-bgPrimary font-medium text-lg rounded-xl text-center">
          {loading ? (
            <ReactLoading
              type="spin"
              color="white"
              width={20}
              height={20}
              className="mx-auto"
            />
          ) : (
            "Login"
          )}
        </button>
      </form>
      <p
        onClick={() => setLogin(false)}
        className="mt-3 select-none cursor-pointer"
      >
        Don't have any account ? SignUp
      </p>
    </>
  );
}

export default Login;
