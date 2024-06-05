import React, { useEffect, useState } from "react";
import "./Results.css";
import { useNavigate } from "react-router-dom";

export default function Results() {
  const [votes, setVotes] = useState([]);
  const navigate = useNavigate();


  const handleLogin = () => {
    navigate("/")
  }

  useEffect(() => {
    // Retrieve votes from local storage
    const storedVotes = JSON.parse(localStorage.getItem("votes")) || [];
    setVotes(storedVotes);
  }, []);

  // Function to calculate percentage of votes for a candidate
  const calculatePercentage = (candidate) => {
    const totalVotes = votes.length;
    const candidateVotes = votes.filter((vote) => vote === candidate).length;
    return totalVotes === 0
      ? 0
      : ((candidateVotes / totalVotes) * 100).toFixed(2);
  };

  // Inline styles for the width of the progress bar
  const getProgressBarStyles = (percentage) => ({
    width: `${percentage}%`,
  });

  return (
    <>
      <div className="results-container">
        <h2 className="results-heading">These are the Results</h2>
        <div className="results-list">
          <div className="container">
            <div className="skill-box">
              <span className="title">Narendra Modi</span>

              <div className="skill-bar">
                <span
                  className="skill-per Modi"
                  style={getProgressBarStyles(
                    calculatePercentage("Narendra Modi")
                  )}
                >
                  <span className="tooltip">
                    {calculatePercentage("Narendra Modi")}%
                  </span>
                </span>
              </div>
            </div>

            <div className="skill-box">
              <span className="title">Rahul Gandhi</span>

              <div className="skill-bar">
                <span
                  className="skill-per Rahul"
                  style={getProgressBarStyles(
                    calculatePercentage("Rahul Gandhi")
                  )}
                >
                  <span className="tooltip">
                    {calculatePercentage("Rahul Gandhi")}%
                  </span>
                </span>
              </div>
            </div>
            <div className="skill-box">
              <span className="title">Arvind Kejriwal</span>

              <div className="skill-bar">
                <span
                  className="skill-per Kejriwal"
                  style={getProgressBarStyles(
                    calculatePercentage("Arvind Kejriwal")
                  )}
                >
                  <span className="tooltip">
                    {calculatePercentage("Arvind Kejriwal")}%
                  </span>
                </span>
              </div>
            </div>
            <div className="skill-box">
              <span className="title">None of the above</span>

              <div className="skill-bar">
                <span
                  className="skill-per NOTA"
                  style={getProgressBarStyles(
                    calculatePercentage("None of the above")
                  )}
                >
                  <span className="tooltip">
                    {calculatePercentage("None of the above")}%
                  </span>
                </span>
              </div>
              <button className="back-btn" onClick={handleLogin}>Go Back To Login</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
