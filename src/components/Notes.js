const Notes = ({ notes, toggleNoteImportance, handleDeleteNote }) => {
  const listStyle = {
    color: "grey",
    padding: "2px",
  };

  return (
    <>
      <h2>All notes</h2>
      <ul>
        {notes.map((note) => {
          return (
            <li key={note.id} style={listStyle}>
              {note.content}{" "}
              <button onClick={() => toggleNoteImportance(note.id)}>
                make {note.important ? "not important" : "important"}{" "}
              </button>{" "}
              <button onClick={() => handleDeleteNote(note.id)}>delete</button>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default Notes;
