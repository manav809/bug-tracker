import { useState, useEffect } from "react";
import "./App.css";
import LoginForm from "./components/Login";
import bugService from "./services/bug";
import Bug from "./components/Bug";

function App() {
  const [bugs, setBugs] = useState([]);

  useEffect(() => {
    bugService.getAll().then((bugs) => setBugs(bugs));
  }, []);

  return (
    <>
      <h1>Bug Tracking Monitor</h1>
      <LoginForm />
      <ul>
        {bugs.map((bug) => {
          return <Bug key={bug.id} bug={bug} />;
        })}
      </ul>
    </>
  );
}

export default App;
