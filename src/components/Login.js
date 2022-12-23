const Login = ({
  handleLogin,
  username,
  handleUsername,
  password,
  handlePassword,
}) => {
  const loginStyle = {
    margin: "10px 0",
  };

  const loginFormStyle = {
    margin: "10px 0",
  };

  return (
    <div style={loginStyle}>
      <form style={loginFormStyle} onSubmit={handleLogin}>
        <div>
          <label>username</label>
          <input value={username} name="Username" onChange={handleUsername} />
        </div>
        <div>
          <label>password</label>
          <input
            type="password"
            value={password}
            name="Password"
            onChange={handlePassword}
          />
        </div>
        <br />
        <button>login</button>
      </form>
    </div>
  );
};

export default Login;
