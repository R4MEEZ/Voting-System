import React from "react";
import { useState } from "react";
import "./VotingPage.css";
import { useNavigate } from "react-router-dom";

export default function VotingPage() {
  const [selectedCandidate, setSelectedCandidate] = useState("");
  const navigate = useNavigate();

  // Function to handle candidate selection
  const handleSelection = (event) => {
    setSelectedCandidate(event.target.value);
  };

  // Function to handle confirm button click
  const handleConfirm = () => {
    if (selectedCandidate === "") {
      alert("choose a candidate");
    } else {
      const existingVotes = JSON.parse(localStorage.getItem("votes")) || [];
      // Add the selected candidate to the array of votes
      existingVotes.push(selectedCandidate);
      // Save the updated array back to local storage
      localStorage.setItem("votes", JSON.stringify(existingVotes));
      navigate("/Results")
    }
  };

  return (
    <>
      <div className="voting-container py-3">
        <h2 className="voting-heading">Choose a Candidate</h2>
        <div className="voting-list">
          <div class="radio-input-wrapper">
            <label class="label">
              <input
                type="radio"
                className="radio-input"
                value="Narendra Modi"
                checked={selectedCandidate === "Narendra Modi"}
                onChange={handleSelection}
              />
              <div class="radio-design"></div>
              <div class="label-text">Narendra Modi</div>
            </label>
            <label class="label">
              <input
                type="radio"
                className="radio-input"
                value="Rahul Gandhi"
                checked={selectedCandidate === "Rahul Gandhi"}
                onChange={handleSelection}
              />
              <div class="radio-design"></div>
              <div class="label-text">Rahul Gandhi</div>
            </label>
            <label class="label">
              <input
                type="radio"
                className="radio-input"
                value="Arvind Kejriwal"
                checked={selectedCandidate === "Arvind Kejriwal"}
                onChange={handleSelection}
              />
              <div class="radio-design"></div>
              <div class="label-text">Arvind Kejriwal</div>
            </label>
            <label class="label">
              <input
                type="radio"
                className="radio-input"
                value="None of the above"
                checked={selectedCandidate === "None of the above"}
                onChange={handleSelection}
              />
              <div class="radio-design"></div>
              <div class="label-text">None of above</div>
            </label>
            <button class="cssbuttons-io-button" onClick={handleConfirm}>
              Confirm
              <div class="icon">
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
    </>
  );
}
