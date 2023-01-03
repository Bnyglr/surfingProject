import React, { useState } from "react";
import Auth from "./components/Auth";
import Main from "./components/Main";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";



function App() {
  
  let [isLogged, setIsLogged] = useState(localStorage.token? localStorage.token:"");
  
  return isLogged ? <Main setIsLogged={setIsLogged}  /> : <Auth setIsLogged={setIsLogged} />;
}

export default App;

//import { Routes, Route, useNavigate } from "react-router-dom";