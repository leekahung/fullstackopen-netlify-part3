const Logout = ({ setNotification }) => {
  const logoutButtonStyles = {
    margin: "10px 0",
  };

  return (
    <div>
      <button
        style={logoutButtonStyles}
        onClick={() => {
          const name = JSON.parse(window.localStorage.loggedNoteappUser).name;
          setNotification(`${name} logging out...`);
          setTimeout(() => {
            setNotification(null);
            window.location.reload();
          }, 2000);
          window.localStorage.removeItem("loggedNoteappUser");
        }}
      >
        logout
      </button>
    </div>
  );
};

export default Logout;
