const Note = ({ note, toggleNoteImportance, handleDeleteNote }) => {
  const label = note.important ? "make not important" : "make important";

  const listStyle = {
    color: "grey",
    padding: "2px",
  };

  return (
    <li style={listStyle} className="note">
      <span>{note.content}</span>{" "}
      <button className="toggle-importance" onClick={toggleNoteImportance}>{label}</button>
      <button className="delete-note" onClick={handleDeleteNote}>delete</button>
    </li>
  );
};

export default Note;
