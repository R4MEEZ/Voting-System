import React, { useState } from "react";
import "./Login.css";
import { NavLink, useNavigate } from "react-router-dom";
import users from "./users";
import Swal from 'sweetalert2'


export default function Login() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // Basic email validation
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    // Check if the entered email and password match any user in the array
    const user = users.find((user) => user.email === email && user.pass === pass);

    if (user) {
      Swal.fire({
        position: "top",
        icon: "success",
        title: "Login Succesful",
        showConfirmButton: false,
        timer: 1000
      });
      navigate('/VotingPage');
    } else {
      alert("Invalid email or password.");
    }
  };

  return (
    <>
      <div className="form-container">
        <h1 className="title my-3">Welcome to our voting web-app</h1>
        <form className="form">
          <p className="form-title">Sign in to your account</p>
          <div className="input-container">
            <input
              placeholder="Enter email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <span>
              <svg
                stroke="currentColor"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                  stroke-width="2"
                  stroke-linejoin="round"
                  stroke-linecap="round"
                ></path>
              </svg>
            </span>
          </div>
          <div className="input-container">
            <input placeholder="Enter password" type="password"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            />
            <span>
              <svg
                stroke="currentColor"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  stroke-width="2"
                  stroke-linejoin="round"
                  stroke-linecap="round"
                ></path>
                <path
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  stroke-width="2"
                  stroke-linejoin="round"
                  stroke-linecap="round"
                ></path>
              </svg>
            </span>
          </div>
          <button className="signin" type="submit" onClick={handleLogin}>
            Sign in
          </button>
          <p className="signup-link">
            No account?
            <NavLink to="/SignIn">
              <span className="mx-1">Sign Up</span>
            </NavLink>
          </p>
        </form>
      </div>
    </>
  );
}
