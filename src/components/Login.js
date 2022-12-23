const Login = ({
  handleLogin,
  username,
  handleUsername,
  password,
  handlePassword,
}) => {
  return (
    <div>
      <form onSubmit={handleLogin}>
        <div>
          <label>username</label>
          <input
            value={username}
            name="Username"
            onChange={handleUsername}
          />
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
        <button>login</button>
      </form>
    </div>
  );
};

export default Login;
