import React from "react";
import { useUser } from "./UserContext";
import defpfp from "../Assets/Profile.svg";
import "./SideProfile.css";
import { signOut } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "./Firebase/Firebase";

export default function SideProfile() {
  const { user } = useUser();
  const navigate = useNavigate();

  const handleLogOut = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const handleLogIn = () => {
    navigate("/");
  };

  const handleProfile = () => {
    navigate("/profile");
    console.log(user)
  };

  if (!user) {
    return (
      <div className="side-profile">
        <div className="pfp-img">
          <img src={defpfp} alt="profile-img" />
        </div>
        <div className="pfp-info">
          <button onClick={handleLogIn} className="boton-elegante">
            Log In
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="side-profile">
      <div className="pfp-img">
        <img src={user.photoURL || defpfp} alt="profile-img" />
      </div>
      <div className="pfp-info">
        {/* <p>{user.displayName}</p> */}
        <button onClick={handleProfile} className="boton-elegante">
          Go to Profile
        </button>
        <button onClick={handleLogOut} className="boton-elegante">
          Log Out
        </button>
      </div>
    </div>
  );
}
