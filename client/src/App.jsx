import { useState, useEffect } from "react";
import "./App.css";
import LoginForm from "./components/Login";
import bugService from "./services/bug";
import Bug from "./components/Bug";
import CreateForm from "./components/Create";
import axios from "axios";
import Notification from "./components/Notification";

function App() {
  const [bugs, setBugs] = useState([]);
  const [user, setUser] = useState(null);
  const [alertColor, setAlertColor] = useState("");
  const [notification, setNotification] = useState("");

  useEffect(() => {
    bugService.getAll().then((bugs) => setBugs(bugs));
  }, []);

  useEffect(() => {
    const loggedInUser = window.localStorage.getItem("logged_user");
    if (loggedInUser) {
      const user = JSON.parse(loggedInUser);
      setUser(user);
      bugService.setToken(user.token);
    }
  }, []);

  const handleLogout = async () => {
    setUser(null);
    window.localStorage.clear();
    localStorage.removeItem("logged_user");
    axios.defaults.headers.common["Authorization"] = null;
  };

  return (
    <>
      <h1>Bug Tracking Monitor</h1>
      {notification ? (
        <Notification
          notification={notification}
          alertColor={alertColor}
        />
      ) : (
        <></>
      )}
      {user === null ? (
        <LoginForm setUser={setUser} setAlertColor={setAlertColor} />
      ) : (
        <>
          <CreateForm
            bugs={bugs}
            setBugs={setBugs}
            setNotification={setNotification}
            setAlertColor={setAlertColor}
          />
          <button onClick={handleLogout}>logout</button>
          <ul>
            {bugs.map((bug) => {
              return <Bug key={bug.id} bug={bug} />;
            })}
          </ul>
        </>
      )}
    </>
  );
}

export default App;
