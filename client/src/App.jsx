import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import LoginForm from "./components/Login";

function App() {
  return (
    <>
      <h1>Bug Tracking Monitor</h1>
      <LoginForm />
    </>
  );
}

export default App;
