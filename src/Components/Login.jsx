import React, { useState } from "react";
import "./Login.css";
import { NavLink, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { auth, googleProvider } from "./Firebase/Firebase";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { useUser } from "./UserContext";
import { useCookies } from "react-cookie";

export default function Login() {
  const [cookies, setCookie] = useCookies(["token"]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login, setLogin] = useState(false);
  const { setUser } = useUser();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    // Basic email validation
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    try {
      setLogin(true);
      await signInWithEmailAndPassword(auth, email, password);
      Swal.fire({
        position: "top",
        icon: "success",
        title: "Login Successful",
        showConfirmButton: false,
        timer: 1000,
      });
      navigate("/VotingPage");
    } catch (err) {
      console.error("Error signing in:", err);
      Swal.fire({
        position: "top",
        icon: "error",
        title: "Login Failed",
        text: "Error Logging In please try again",
        showConfirmButton: true,
      });
      setLogin(false);
    }
  };

  const handleGoogleLogin = async (e) => {
    e.preventDefault();
    try {
      setLogin(true);
      const userDetails = await signInWithPopup(auth, googleProvider);
      const user = userDetails.user;
      const token = await user.getIdToken();
      setCookie("token", token, { path: "/" , maxAge:6000});
      setUser(user);
      console.log(user);

      Swal.fire({
        position: "top",
        icon: "success",
        title: "Login Successful",
        showConfirmButton: false,
        timer: 1000,
      });
      navigate("/Profile");
    } catch (error) {
      console.error("Error logging in with Google", error);
      Swal.fire({
        position: "top",
        icon: "error",
        title: "Google Login Failed",
        text: error.message,
        showConfirmButton: true,
      });
      setLogin(false);
    }
  };

  return (
    <>
      <div className="form-container">
        <h1 className="title my-3">Welcome to our voting web-app</h1>
        <form className="form" onSubmit={handleLogin}>
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
                  strokeWidth="2"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                ></path>
              </svg>
            </span>
          </div>
          <div className="input-container">
            <input
              placeholder="Enter password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
          <button className="signin" type="submit" disabled={login}>
            {login ? "Signing In..." : "Sign in"}
          </button>
          <p className="signup-link">
            No account?
            <NavLink to="/SignIn">
              <span className="mx-1">Sign Up</span>
            </NavLink>
          </p>
          <button className="google" onClick={handleGoogleLogin}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="xMidYMid"
              viewBox="0 0 256 262"
            >
              <path
                fill="#4285F4"
                d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"
              ></path>
              <path
                fill="#34A853"
                d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"
              ></path>
              <path
                fill="#FBBC05"
                d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782"
              ></path>
              <path
                fill="#EB4335"
                d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"
              ></path>
            </svg>
            Continue with Google
          </button>
        </form>
      </div>
    </>
  );
}
