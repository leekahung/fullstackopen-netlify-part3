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
    </div>
  );
};

export default NotesForm;
