import React, { useEffect, useState } from "react";
import "./Results.css";
import { useNavigate } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./Firebase/Firebase";

export default function Results() {
  const [candidates, setCandidates] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "Votes"));
        const candidatesData = [];

        querySnapshot.forEach((doc) => {
          candidatesData.push({ id: doc.id, ...doc.data() });
        });

        setCandidates(candidatesData);
      } catch (error) {
        console.error("Error fetching votes: ", error);
      }
    };
    getData();
  }, []);

  const handleLogin = () => {
    navigate("/");
  };

  const calculateTotalVotes = () => {
    return candidates.reduce((total, candidate) => total + candidate.voteCount, 0);
  };

  const calculatePercentage = (voteCount) => {
    const totalVotes = calculateTotalVotes();
    return totalVotes === 0 ? 0 : ((voteCount / totalVotes) * 100).toFixed(2);
  };

  const getProgressBarStyles = (percentage) => ({
    width: `${percentage}%`,
  });

  return (
    <>
      <div className="results-container">
        <h2 className="results-heading">These are the Results</h2>
        <div className="results-list">
          <div className="container">
            {candidates.map((candidate) => (
              <div className="skill-box" key={candidate.id}>
                <span className="title">{candidate.candidateName}</span>
                <div className="skill-bar">
                  <span
                    className={`skill-per ${candidate.id}`}
                    style={getProgressBarStyles(
                      calculatePercentage(candidate.voteCount)
                    )}
                  >
                    <span className="tooltip">
                      {candidate.voteCount} votes
                    </span>
                  </span>
                </div>
              </div>
            ))}
            <button className="back-btn" onClick={handleLogin}>
              Go Back To Login
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
