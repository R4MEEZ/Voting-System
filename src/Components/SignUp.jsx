import React, { useState } from "react";
import "./SignUp.css";
import { NavLink, useNavigate } from "react-router-dom";
import { auth } from "./Firebase/Firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import Swal from "sweetalert2";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [signUp, setSignup] = useState(false);
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleNameChange = (e) => {
    setDisplayName(e.target.value);
  };

  const handlePassChange = (e) => {
    setPassword(e.target.value);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (!displayName) {
      setError("Please enter a display name.");
      return;
    }
    if (!password) {
      setError("Please enter a password.");
      return;
    }
    try {
      setSignup(true);
      const userDetails = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await updateProfile(userDetails.user, {
        displayName: displayName,
      });
      console.log("Account created and display name set");
      Swal.fire({
        position: "top",
        icon: "success",
        title: "Account Created Successfully",
        showConfirmButton: false,
        timer: 1000,
      });
      navigate("/")
    } catch (err) {
      console.error("Error signing up: ", err);
      Swal.fire({
        position: "top",
        icon: "error",
        title: "Error Signing Up please try again",
        showConfirmButton: false,
        timer: 1000,
      });
    }
  };

  return (
    <>
      <div className="form-container">
        <h1 className="title my-3">Welcome to our voting web-app</h1>
        <form className="form" onSubmit={handleFormSubmit}>
          <p className="form-title">Sign up for your account</p>
          {error && <p className="error-message">{error}</p>}
          <div className="input-container">
            <input
              placeholder="Enter email"
              type="email"
              value={email}
              onChange={handleEmailChange}
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
                  strokeWidth="2"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                ></path>
              </svg>
            </span>
          </div>

          <div className="input-container">
            <input
              placeholder="Enter Display Name"
              type="text"
              value={displayName}
              onChange={handleNameChange}
            />
          </div>

          <div className="input-container">
            <input
              placeholder="Enter password"
              type="password"
              value={password}
              onChange={handlePassChange}
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
                  strokeWidth="2"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                ></path>
                <path
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  strokeWidth="2"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                ></path>
              </svg>
            </span>
          </div>
          <button className="signup" type="submit">
          { signUp ? "Signing Up..." : "Sign Up"}
          </button>
          <p className="signup-link">
            Already have an account?
            <NavLink to="/">
              <span className="mx-1">Login</span>
            </NavLink>
          </p>
        </form>
      </div>
    </>
  );
}
