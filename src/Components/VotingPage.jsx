import React, { useEffect, useState } from "react";
import "./VotingPage.css";
import { useNavigate } from "react-router-dom";
import {
  collection,
  getDocs,
  doc,
  updateDoc,
  increment,
  addDoc,
  serverTimestamp,
  getDoc,
  setDoc,
} from "firebase/firestore";
import { db } from "./Firebase/Firebase";
import { useUser } from "./UserContext";

export default function VotingPage() {
  const [selectedCandidate, setSelectedCandidate] = useState("");
  const [hasVoted, setHasVoted] = useState(false);
  const navigate = useNavigate();
  const { user } = useUser(); 

  useEffect(() => {
    const userHasVoted = async () => {
      if (user) {
        const userDoc = await getDoc(doc(db, "Voters", user.uid));
        if (userDoc.exists()) {
          setHasVoted(true);
        }
      }
    };

    if (user) {
      userHasVoted();
    }
  }, [user]);

  const handleSelection = (event) => {
    setSelectedCandidate(event.target.value);
  };

  const handleConfirm = async () => {
    if (selectedCandidate === "") {
      alert("Please choose a candidate");
      return;
    }

    if (user) {
      if (hasVoted) {
        alert("You have already voted.");
        navigate("/Profile")
        return;
      }

      try {
        const candidateRef = doc(db, "Votes", selectedCandidate);

        // Increment the vote count for the selected candidate
        await updateDoc(candidateRef, {
          voteCount: increment(1),
        });

        await setDoc(doc(db, "Voters", user.uid), {
          userId: user.uid,
          timestamp: serverTimestamp(),
          displayName: user.displayName,
          votedFor: selectedCandidate
        });

        setHasVoted(true); 

        alert("Vote successfully cast!");
        navigate("/Results")
      } catch (error) {
        console.error("Error casting vote: ", error);
        alert("An error occurred while casting your vote. Please try again.");
      }
    } else {
      alert("You must be logged in to vote.");
    }
  };

  return (
    <div className="voting-container py-3">
      <h2 className="voting-heading">Choose a Candidate</h2>
      <div className="voting-list">
        <div className="radio-input-wrapper">
          <label className="label">
            <input
              type="radio"
              className="radio-input"
              value="Narendra Modi"
              checked={selectedCandidate === "Narendra Modi"}
              onChange={handleSelection}
            />
            <div className="radio-design"></div>
            <div className="label-text">Narendra Modi</div>
          </label>
          <label className="label">
            <input
              type="radio"
              className="radio-input"
              value="Rahul Gandhi"
              checked={selectedCandidate === "Rahul Gandhi"}
              onChange={handleSelection}
            />
            <div className="radio-design"></div>
            <div className="label-text">Rahul Gandhi</div>
          </label>
          <label className="label">
            <input
              type="radio"
              className="radio-input"
              value="Arvind Kejriwal"
              checked={selectedCandidate === "Arvind Kejriwal"}
              onChange={handleSelection}
            />
            <div className="radio-design"></div>
            <div className="label-text">Arvind Kejriwal</div>
          </label>
          <label className="label">
            <input
              type="radio"
              className="radio-input"
              value="NOTA"
              checked={selectedCandidate === "NOTA"}
              onChange={handleSelection}
            />
            <div className="radio-design"></div>
            <div className="label-text">None of the above</div>
          </label>
          <button className="cssbuttons-io-button" onClick={handleConfirm}>
            Confirm
            <div className="icon">
              <svg
                height="24"
                width="24"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M0 0h24v24H0z" fill="none"></path>
                <path
                  d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z"
                  fill="currentColor"
                ></path>
              </svg>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
