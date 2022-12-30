const Note = ({ note, toggleNoteImportance, handleDeleteNote }) => {
  const label = note.important ? "make not important" : "make important";

  const listStyle = {
    color: "grey",
    padding: "2px",
  };

  return (
    <li style={listStyle} className="note">
      {note.content} <button onClick={toggleNoteImportance}>{label}</button>
      <button onClick={handleDeleteNote}>delete</button>
    </li>
  );
};

export default Note;
