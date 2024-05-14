import { useState } from "react";
import loginService from "../services/login";
import bugService from "../services/bug";

const LoginForm = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        email,
        password,
      });
      console.log(user)
      window.localStorage.setItem("logged_user", JSON.stringify(user));
      bugService.setToken(user.token);
      setEmail("");
      setPassword("");
    } catch (exception) {
      console.log(exception);
    }
  };

  return (
    <>
      <h3>Login</h3>
      <form onSubmit={handleLogin}>
        <div>
          <input
            type="email"
            value={email}
            placeholder="email"
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>
        <div>
          <input
            type="password"
            value={password}
            placeholder="password"
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </>
  );
};

export default LoginForm;
