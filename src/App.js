import { useEffect, useState } from "react";
import noteServices from "./services/notes";
import Header from "./components/Header";
import Notes from "./components/Notes";
import ShowNoteButton from "./components/ShowNoteButton";
import NotesForm from "./components/NotesForm";
import Footer from "./components/Footer";

const App = () => {
  const [notes, setNotes] = useState([]);
  const [showAll, setShowAll] = useState(true);
  const [newNote, setNewNote] = useState("");
  const [noteImportance, setNoteImportance] = useState(false);

  useEffect(() => {
    noteServices.getAll().then((returnedNotes) => {
      setNotes(returnedNotes);
    });
  }, []);

  const notesToShow = showAll ? notes : notes.filter((n) => n.important);

  const handleShowAll = () => {
    setShowAll(!showAll);
  };

  const handleNewNote = (event) => {
    setNewNote(event.target.value);
  };

  const handleAddNote = (event) => {
    event.preventDefault();
    const noteObject = {
      id: notes.length + 1,
      content: newNote,
      date: new Date().toISOString(),
      important: Boolean(noteImportance),
    };

    noteServices.create(noteObject).then((newNoteObject) => {
      setNotes(notes.concat(newNoteObject));
      setNewNote("");
      setNoteImportance(false);
    });
  };

  const handleNoteImportance = (event) => {
    setNoteImportance(event.target.value);
  };

  const toggleNoteImportance = (id) => {
    const note = notes.find((n) => n.id === id);
    const updateNote = { ...note, important: !note.important };

    noteServices.update(id, updateNote).then((updatedNote) => {
      setNotes(notes.map((n) => (n.id !== id ? n : updatedNote)));
    });
  };

  return (
    <div className="App">
      <Header />
      <ShowNoteButton handleShowAll={handleShowAll} showAll={showAll} />
      <Notes notes={notesToShow} toggleNoteImportance={toggleNoteImportance} />
      <NotesForm
        handleAddNote={handleAddNote}
        newNote={newNote}
        handleNewNote={handleNewNote}
        noteImportance={noteImportance}
        handleNoteImportance={handleNoteImportance}
      />
      <Footer />
    </div>
  );
};

export default App;
