import React, { useState } from "react";
import { useUser } from "./UserContext";
import { auth } from "./Firebase/Firebase";

function UserProfile() {
  const { user } = useUser();
  const [displayName, setDisplayName] = useState("");
  const [photoURL, setPhotoURL] = useState("");

  const handleUpdateProfile = async () => {
    try {
      await auth.currentUser.updateProfile({
        displayName: displayName,
        photoURL: photoURL,
      });

      console.log("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <div>
      <h2>User Profile</h2>
      <div>
        <label>
          Display Name:
          <input
            type="text"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          Photo URL:
          <input
            type="text"
            value={photoURL}
            onChange={(e) => setPhotoURL(e.target.value)}
          />
        </label>
      </div>
      <button onClick={handleUpdateProfile}>Update Profile</button>
    </div>
  );
}

export default UserProfile;
