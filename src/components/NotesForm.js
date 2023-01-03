import { useState } from "react";

const NotesForm = ({ handleAddNote }) => {
  const [newNote, setNewNote] = useState("");
  const [noteImportance, setNoteImportance] = useState(false);

  const handleNewNote = (event) => {
    setNewNote(event.target.value);
  };

  const handleNoteImportance = (event) => {
    setNoteImportance(event.target.value);
  };

  const submitNote = async (event) => {
    event.preventDefault();
    const noteObject = {
      content: newNote,
      date: new Date().toISOString(),
      important: Boolean(noteImportance),
    };

    handleAddNote(noteObject);
    setNewNote("");
    setNoteImportance(false);
  };

  const noteStyle = {
    margin: "10px 0",
  };

  const formStyle = {
    margin: "10px 0",
  };

  return (
    <div style={noteStyle}>
      <h2>Create a new note</h2>
      <form style={formStyle} onSubmit={submitNote}>
        <input
          id="note-input"
          value={newNote}
          onChange={handleNewNote}
          placeholder="write note content here"
        />{" "}
        <label>Important?</label>
        <input
          id="important-box"
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
