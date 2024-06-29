import "./App.css";
import Login from "./Components/Login";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import VotingPage from "./Components/VotingPage";
import Results from "./Components/Results";
import SignUp from "./Components/SignUp";
import PrivateRoutes from "./Components/PrivateRoutes";
import Profile from "./Components/Profile";
import SideProfile from "./Components/SideProfile";
import UserProfile from "./Components/UserProfile";
// import Test from "./Components/Test";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <SideProfile />
        {/* <Test /> */}
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/SignIn" element={<SignUp />} />
          <Route element={<PrivateRoutes />}>
            {/* <Route path="/UserProfile" element={<UserProfile />} /> */}
            <Route path="/Profile" element={<Profile />} />
            <Route path="/Results" element={<Results />} />
            <Route path="/VotingPage" element={<VotingPage />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
