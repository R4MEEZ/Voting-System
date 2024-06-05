import "./App.css";
import Login from "./Components/Login";
import SignIn from "./Components/SignIn";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import VotingPage from "./Components/VotingPage";
import Results from "./Components/Results";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/SignIn" element={<SignIn />} />
          <Route path="/Results" element={<Results />} />
          <Route path="/VotingPage" element={<VotingPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
