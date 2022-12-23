import { useEffect, useState } from "react";
import noteServices from "./services/notes";
import Header from "./components/Header";
import Notes from "./components/Notes";
import ShowNoteButton from "./components/ShowNoteButton";
import NotesForm from "./components/NotesForm";
import Footer from "./components/Footer";
import loginService from "./services/login";
import Login from "./components/Login";

const App = () => {
  const [notes, setNotes] = useState([]);
  const [showAll, setShowAll] = useState(true);
  const [newNote, setNewNote] = useState("");
  const [noteImportance, setNoteImportance] = useState(false);
  const [notification, setNotification] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    noteServices.getAll().then((returnedNotes) => {
      setNotes(returnedNotes);
    });
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedNoteappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      noteServices.setToken(user.token);
    }
  }, []);

  const notesToShow = showAll ? notes : notes.filter((n) => n.important);

  const handleShowAll = () => {
    setShowAll(!showAll);
  };

  const handleNewNote = (event) => {
    setNewNote(event.target.value);
  };

  const handleAddNote = async (event) => {
    event.preventDefault();
    try {
      const noteObject = {
        content: newNote,
        date: new Date().toISOString(),
        important: Boolean(noteImportance),
      };

      noteServices.create(noteObject).then((newNoteObject) => {
        setNotes(notes.concat(newNoteObject));
        setNewNote("");
        setNoteImportance(false);
      });
    } catch (exception) {
      setNotification("Only users can save posts to app");
      setTimeout(() => {
        setNotification(null);
      }, 5000);
    }
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

  const handleDeleteNote = (id) => {
    noteServices.remove(id).then(() => {
      setNotes(notes.filter((n) => n.id !== id));
    });
  };

  const handleUsername = (event) => {
    setUsername(event.target.value);
  };

  const handlePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password,
      });
      window.localStorage.setItem("loggedNoteappUser", JSON.stringify(user));

      noteServices.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
      setNotification(`${user.name} logged in`);
      setTimeout(() => {
        setNotification(null);
      }, 5000);
    } catch (exception) {
      setNotification("Wrong credentials");
      setTimeout(() => {
        setNotification(null);
      }, 5000);
    }
  };

  return (
    <div className="App">
      <Header />
      <div>{notification}</div>
      {user === null ? (
        <Login
          handleLogin={handleLogin}
          username={username}
          handleUsername={handleUsername}
          password={password}
          handlePassword={handlePassword}
        />
      ) : (
        <NotesForm
          handleAddNote={handleAddNote}
          newNote={newNote}
          handleNewNote={handleNewNote}
          noteImportance={noteImportance}
          handleNoteImportance={handleNoteImportance}
          setNotification={setNotification}
        />
      )}
      <ShowNoteButton handleShowAll={handleShowAll} showAll={showAll} />
      <Notes
        notes={notesToShow}
        toggleNoteImportance={toggleNoteImportance}
        handleDeleteNote={handleDeleteNote}
      />
      <Footer />
    </div>
  );
};

export default App;
