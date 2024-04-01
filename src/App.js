import React from "react";
import { BrowserRouter , Routes , Route } from "react-router-dom";
import { Provider } from "react";
import LoggedInHeader from "./components/LoggedInHeader.jsx"
import LoggedOutHeader from "./components/LoggedOutHeader.jsx"
import Home from "./pages/Home.jsx"
import SignIn from "./pages/SignIn.jsx"
import SignUp from "./pages/SignUp.jsx"

function App() { 
  return (
    <BrowserRouter>
      {localStorage.getItem('user') ? <LoggedInHeader/> : <LoggedOutHeader/>}
      <Routes>
      <Route path="/" element = {<Home/>}></Route>
      <Route path="/signin" element = {<SignIn/>} />
      <Route path="/signup" element = {<SignUp/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;