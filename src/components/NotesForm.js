const NotesForm = ({
  handleAddNote,
  newNote,
  handleNewNote,
  noteImportance,
  handleNoteImportance,
  setNotification,
}) => {
  const noteStyle = {
    margin: "10px 0",
  };

  const formStyle = {
    margin: "10px 0",
  };

  return (
    <div style={noteStyle}>
      <form style={formStyle} onSubmit={handleAddNote}>
        <input value={newNote} onChange={handleNewNote} />{" "}
        <label>Important?</label>
        <input
          type="checkbox"
          value={noteImportance}
          onChange={handleNoteImportance}
        />{" "}
        <button>save</button>
      </form>
      <button
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

export default NotesForm;
