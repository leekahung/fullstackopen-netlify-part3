const NotesForm = ({
  handleAddNote,
  newNote,
  handleNewNote,
  noteImportance,
  handleNoteImportance,
}) => {
  return (
    <div>
      <form onSubmit={handleAddNote}>
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
