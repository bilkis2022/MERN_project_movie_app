import React from "react";
import "./App.css";
import Topbar from "./components/topbar/Topbar";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";

function App() {
  

  return <div className="App">
    <Topbar />
    <Home />
    <Login />
  </div>;
}

export default App;
