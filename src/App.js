import React from "react";
import { BrowserRouter , Routes , Route } from "react-router-dom";
import LoggedInHeader from "./components/LoggedInHeader.jsx"
import LoggedOutHeader from "./components/LoggedOutHeader.jsx"
import Home from "./pages/Home.jsx"
import SignIn from "./pages/SignIn.jsx"
import SignUp from "./pages/SignUp.jsx"
import Profile from "./pages/Profile.jsx"
import Search from "./pages/Search.jsx";
import BloodGroupTracking from "./pages/BloodGroupTracking.jsx";

function App() { 
  return (
    <BrowserRouter>
      {localStorage.getItem('user') ? <LoggedInHeader/> : <LoggedOutHeader/>}
      <Routes>
      <Route path="/" element = {<Home/>}></Route>
      <Route path="/signin" element = {<SignIn/>} />
      <Route path="/signup" element = {<SignUp/>} />
      <Route path="/profile/:username" element = {<Profile/>} />
      <Route path="/search" element = {<Search/>} />
      <Route path="/requestBlood" element = {<BloodGroupTracking/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;