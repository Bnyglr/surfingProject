import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import Auth from "./components/Auth";
import Main from "./components/Main";
import React, { useState } from "react";

function App() {
  let [isLogged, setIsLogged] = useState(localStorage.token);

  return isLogged ? <Main /> : <Auth setIsLogged={setIsLogged} />;
}

export default App;
