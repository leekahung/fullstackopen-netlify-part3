const Notes = ({ notes, toggleNoteImportance }) => {
  const listStyle = {
    color: "grey",
    padding: "2px"
  }

  return (
    <ul>
      {notes.map((note) => {
        return (
          <li
            key={note.id}
            style={listStyle}
          >
            {note.content}{" "}
            <button onClick={() => toggleNoteImportance(note.id)}>
              make {note.important ? "not important" : "important"}{" "}
            </button>
          </li>
        );
      })}
    </ul>
  );
};

export default Notes;
