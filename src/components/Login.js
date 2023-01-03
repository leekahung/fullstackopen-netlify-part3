import { useState } from "react";

const Login = ({ handleLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleUsername = (event) => {
    setUsername(event.target.value);
  };

  const handlePassword = (event) => {
    setPassword(event.target.value);
  };

  const submitLogin = async (event) => {
    event.preventDefault();

    handleLogin(username, password);
    setUsername("");
    setPassword("");
  };

  const loginStyle = {
    margin: "10px 0",
  };

  const loginFormStyle = {
    margin: "10px 0",
  };

  return (
    <div style={loginStyle}>
      <form style={loginFormStyle} onSubmit={submitLogin}>
        <div>
          <label>username</label>
          <input
            id="username"
            value={username}
            name="username"
            onChange={handleUsername}
          />
        </div>
        <div>
          <label>password</label>
          <input
            id="password"
            type="password"
            value={password}
            name="password"
            onChange={handlePassword}
          />
        </div>
        <br />
        <button id="login-button">login</button>
      </form>
    </div>
  );
};

export default Login;
